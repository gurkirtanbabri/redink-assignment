import AuthorModel from "../models/author.model.js";
import PostModel from "../models/post.model.js";
import { validater, sendEmail } from '../utils.js'


const postController = {} 



postController.validatePost = (req, res, next) => {

  const tests = [
    {
      key: 'title'
    },
    {
      key: 'authorId',
    },
    {
      key: 'discription'
    },
    {
      key: 'blog',
    },

  ]

  validater(req,next,tests)
}

postController.findPostByIdParam = async(req, res, next, id) => {
  try {

    const post = await PostModel.findById(id)

    if (!post) {
      res
        .status(400)
        .send('post not found')
        return
    }

    req.post = post
    next()

  } catch(error) {
    console.log(error)

    res
      .status(500)
      .send(['internel server error'])
  }
}

postController.findPostById = (req, res) => {
  return res.send(req.post)
}



postController.addBlog = async (req, res) => {
  try {

    // sent errors before fetching author to prevent extra database query
    if (req.errors.length) {
      return res
        .status(400)
        .send(req.errors)
    }


    const author = await AuthorModel.findById(req.body.authorId)

    if (!author) {
    
      return res
        .status(400)
        .send({
          key: 'authorId',
          message: 'Please add valid author id'
        })
    }

    const postData = new PostModel(req.body)
    await postData.save()

    /* response sent becouse i dont want user wait until wholeprocesss */
    res.send(postData)

    const emails = await AuthorModel.find({
      _id: { $ne: req.body.authorId }
    }).distinct('email')
  

    if(emails.length) {

      const messaege = 'please check our new blog '
      const subject = 'new blog'
      
      sendEmail(emails, subject, messaege)
    }

  } catch (error) {
    console.log(error)

    // res
    // .status(500)
    // .send(['internel server error'])
  }
}


postController.getPostsByAuthorId = async (req, res) => {
  try {
    const allPosts = await PostModel.find({
      authorId: {$eq: req.body.authorId}
    })

    return res.send(allPosts)
  }
  catch (error){
    console.log(error)

    res
    .status(500)
    .send(['internel server error'])
  }
}


postController.updatePostById = async(req, res) => {
  try {


    if (req.errors.length) {

      return res
        .status(400)
        .send(req.errors)
    }

    const updatedPost = await PostModel
      .findByIdAndUpdate(
        req.post.id,
        req.body,
        {new: true}
      )


    res.send(updatedPost)
  }
  catch (error) {
    console.log(error)

    res
    .status(500)
    .send(['internel server error'])
  }
}

postController.deletePostById = async (req, res) => {
  try {

    await PostModel.findByIdAndDelete(req.body.Postid)
    return res.send('post deleted successfully')
  }
  catch(error) {
    
    console.log(error)

    res
    .status(500)
    .send(['internel server error'])
  }
}

export default postController