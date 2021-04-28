import { combineReducers } from "redux";
import player from "./playerReducer";
import playlist from "./playlistReducer";
import song from "./songReducer";
import area from "./areaReducer";
import user from "./userReducer";
import artist from "./artistReducer";

export default combineReducers({
  player,
  playlist,
  song,
  area,
  user,
  artist,
});
