import { db, mongodb } from '../models/index.js'
import { format } from 'date-fns';

const ConnectFourResults = mongodb.connectFourResults;

function postGameResult(req, res, next) {
  

  ConnectFourResults.create({
    algorithmen: req.body.algorithmen, 
    gameResult: req.body.gameResult, 
    game: req.body.game,
    userid: req.userId
  }, (err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(201).send({ message: "Successfull saved." })
    }
  })  
}

function getGameStats(req, res, next) {
  res.status(200).send({ message: "test Get Stats" })
}

const gameCfController = {
  postGameResult,
  getGameStats
};

export default gameCfController;