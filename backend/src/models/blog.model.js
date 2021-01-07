import mongoose from'mongoose'

const blogPostSchema = mongoose.Schema({
  userid: Number, 
  date: { type: Date, default: Date.now },
  title: String,
  body: String
})

export default mongoose.model('blogPost', blogPostSchema);