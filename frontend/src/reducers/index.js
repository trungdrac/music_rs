import { combineReducers } from "redux";
import player from "./playerReducer";
import playlist from "./playlistReducer";

export default combineReducers({
  player,
  playlist,
});
