import * as types from "../constants/ActionTypes";

export const setPlaylistArea = (playlists) => {
  return {
    type: types.SET_PLAYLIST_AREA,
    playlists,
  };
};

export const setPlaylistUser = (playlists) => {
  return {
    type: types.SET_PLAYLIST_USER,
    playlists,
  };
};
