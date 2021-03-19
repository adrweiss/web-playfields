import axios from '../config/axios';
//import authHeader from "./auth-header";

const saveGame = (userId, algorithmen, gameResult, game) => {
  return axios.post("/game/cf/result", {
    userId,
    algorithmen,
    gameResult,
    game
  });
};

const saveGame = (userId, algorithmen, gameResult, game) => {
  return axios.post("/api/game/personal/cf/result", {
    userId,
    algorithmen,
    gameResult,
    game
  });
};

const GameCfService = {
  saveGame,

}

export default GameCfService;