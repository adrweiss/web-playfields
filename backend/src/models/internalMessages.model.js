import mongoose from'mongoose'

const internalMessageSchema = mongoose.Schema({
  type: String,
  mail: String,
  reson: String,
  body: String,
  solved: String,
  date: { type: Date, default: Date.now }
})

export default mongoose.model('intMess', internalMessageSchema);