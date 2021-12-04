import mongoose from 'mongoose'

const schema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },

  discription: {
    type: String,
    require: true
  },
  
  blog: {
    type: String,
    require: true
  },

  authorId: {
    type: mongoose.Types.ObjectId,
    require: true
  }
})

export default mongoose.model('Post', schema)