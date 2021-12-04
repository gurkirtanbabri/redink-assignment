import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import autherRoutes from './routes/author.routes.js'
import postRoutes from './routes/post.routes.js'

dotenv.config()

function setupDatabase(uri) {
  return new Promise((resolve, reject) => {

    mongoose.connect(
      uri,
      (error) => {
        if (error) {

          console.log(error)
          reject(error)
          return
        }
        console.log('database connected')
        resolve()
      }
    )
  })
}

async function main() {
  try {

  await setupDatabase(process.env.DATABASE_URI)
  const app = express()
  app.use(express.json())
  
  app.use(autherRoutes)
  app.use(postRoutes)

  const port = process.env.PORT || 2000

  app.listen(port, () => {
    console.log(`app is listening on ${port}`)
  })

  }
  catch (error) {

    // in production we can use logger like winston insted of console.log
    console.log(error)
  }
}

main()