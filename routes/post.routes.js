import express from 'express'

import postController from '../controllers/post.controller.js'

const router = express.Router()

//params
router.param('postId', postController.findPostByIdParam)

//routes
router.put('/addPost', postController.validatePost, postController.addBlog)
router.get('/getPost/:postId',postController.findPostById)
router.post('/updatePost/:postId',postController.validatePost, postController.updatePostById)
router.delete('/deletePostById', postController.deletePostById)
router.get('/getPostsByAuthorId',  postController.getPostsByAuthorId)


export default router