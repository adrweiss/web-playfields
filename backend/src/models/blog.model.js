import mongoose from'mongoose'

const blogPostSchema = mongoose.Schema({
  userid: Number, 
  date: { type: Date, default: Date.now },
  title: String,
  body: String, 
  reported: {type: Boolean, default: false},
  solved: {type: Boolean, default: false},
  changed: {type: Boolean, default: false},
  deleted: {type: Boolean, default: false}
})

export default mongoose.model('blogPost', blogPostSchema);