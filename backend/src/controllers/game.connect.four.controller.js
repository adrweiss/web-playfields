import { db, mongodb } from '../models/index.js'
import { format } from 'date-fns';

function postGameResult(req, res, next) {
  /*
  req.body.userId
  req.body.algorithmen
  req.body.gameResult
  req.body.game
  */

  console.log(req.body)

  /*
  
  ----

  Date
  Train

  */
  res.status(200).send({message: "test Post"})
}

function getGameStats(req, res, next) {
  res.status(200).send({message: "test Get Stats"})
}

const gameCfController = {
  postGameResult, 
  getGameStats
};

export default gameCfController;