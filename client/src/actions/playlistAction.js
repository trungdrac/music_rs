import * as types from "../constants/ActionTypes";

export const setPlaylist = (playlist) => {
  return {
    type: types.SET_PLAYLIST,
    playlist,
  };
};
