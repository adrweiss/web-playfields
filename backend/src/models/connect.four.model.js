import mongoose from'mongoose'

const connectFourResults = mongoose.Schema({
  date: { type: Date, default: Date.now },
  userid: Number,   
  algorithmen: String, 
  train: Boolean,
  gameResult: String,
  game: [Number],  
})

export default mongoose.model('connectFourResults', connectFourResults);