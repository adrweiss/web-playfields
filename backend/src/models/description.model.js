import mongoose from'mongoose'

const descriptionSchema = mongoose.Schema({
  serial_number: Number,
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
})

export default mongoose.model('description', descriptionSchema);