import express from 'express'

import authorController from '../controllers/author.controller.js'

const router = express.Router()

router.put('/addAuthor', authorController.validateAuthor,  authorController.addAuthor)

export default router