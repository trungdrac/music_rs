import { combineReducers } from "redux";
import player from "./playerReducer";
import playlist from "./playlistReducer";
import song from "./songReducer";

export default combineReducers({
  player,
  playlist,
  song,
});
