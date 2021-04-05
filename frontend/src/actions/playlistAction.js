import * as types from "../constants/ActionTypes";

export const getPlaylist = (playlist) => {
  return {
    type: types.GET_PLAYLIST,
    playlist,
  };
};
