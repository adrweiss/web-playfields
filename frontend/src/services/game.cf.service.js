import axios from '../config/axios';
import authHeader from "./auth-header";

const saveGame = (algorithmen, gameResult, game) => {
  return axios.post("/game/cf/result", {
    algorithmen,
    gameResult,
    game
  });
};

const saveGamePersonal = (algorithmen, gameResult, game) => {
  return axios.post("/game/personal/cf/result", {
    algorithmen,
    gameResult,
    game
  }, { headers: authHeader() });
};

const getStats = () => {
  return axios.get("/game/cf/stats");
};

const getPersonalStats = () => {
  return axios.get("game/personal/cf/stats", { headers: authHeader() });
}

const GameCfService = {
  saveGame,
  saveGamePersonal,
  getStats,
  getPersonalStats,
}

export default GameCfService;