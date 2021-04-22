import * as types from "../constants/ActionTypes";

export const setListPlaying = (listPlaying) => {
  return {
    type: types.SET_LIST_PLAYING,
    listPlaying,
  };
};

export const setPlaylistArea = (playlists) => {
  return {
    type: types.SET_PLAYLIST_AREA,
    playlists,
  };
};
