import AuthorModel from "../models/author.model.js";
import { validater, validateEmail } from '../utils.js'

const authorController = {}

authorController.validateAuthor = (req, res, next) => {

  const tests = [
    {
      key: 'name'
    },
    {
      key: 'email',
      tester: validateEmail
    },

  ]

  validater(req,next,tests)

}

authorController.addAuthor = async (req, res) => {
  try {
    
    if (req.errors.length) {
      return res
        .status(400)
        .send(req.errors)
    }

    const isAuthorExistWithSameEmail = await AuthorModel.findOne({
      email: req.body.email
    })

    if (isAuthorExistWithSameEmail) {

      return res
        .status(400)
        .send(      {
          key: 'email',
          message: 'author with this email already exists'
        })
    }

   const autherData = new AuthorModel(req.body)
   await autherData.save()

   res.send(autherData)
  } catch (error) {

    res
    .status(500)
    .send(['internel server error'])

    console.log(error)
  }
}

export default authorController