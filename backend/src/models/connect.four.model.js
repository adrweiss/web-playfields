import mongoose from'mongoose'

const connectFourResults = mongoose.Schema({
  date: { type: Date, default: Date.now },
  userid: Number,   
  algorithmen: String, 
  gameResult: String,
  game: [Number],  
  type: {type: Number, default: 0},
  positiveGame: {type: Number, default: null},
  negativeGame: {type: Number, default: null},
})

export default mongoose.model('connectFourResults', connectFourResults);