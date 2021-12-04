import mongoose from 'mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true,
    unique: true
  }
})

schema.index({email: 1 });

export default mongoose.model('Authors', schema)