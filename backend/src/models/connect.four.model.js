import mongoose from'mongoose'

const connectFourResults = mongoose.Schema({
  date: { type: Date, default: Date.now },
  userid: Number,   
  algorithmen: String, 
  gameResult: String,
  game: [Number],  
  train: {type: Boolean, default: false},
})

export default mongoose.model('connectFourResults', connectFourResults);