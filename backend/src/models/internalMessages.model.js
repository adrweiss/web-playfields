import mongoose from'mongoose'

const internalMessageSchema = mongoose.Schema({
  type: String,
  mail: String,
  reason: String,
  body: String,
  solved: {type: Boolean, default: false},
  date: { type: Date, default: Date.now }
})

export default mongoose.model('internalMessage', internalMessageSchema);