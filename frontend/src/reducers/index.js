import { combineReducers } from "redux";
import app from "./appReducer";
import player from "./playerReducer";
import playlist from "./playlistReducer";
import song from "./songReducer";

export default combineReducers({
  app,
  player,
  playlist,
  song,
});
