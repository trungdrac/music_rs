import * as types from "../constants/ActionTypes";

export const setPlaylistArea = (playlists) => {
  return {
    type: types.SET_PLAYLIST_AREA,
    playlists,
  };
};

export const setMyPlaylist = (playlists) => {
  return {
    type: types.SET_MY_PLAYLIST,
    playlists,
  };
};

export const setPlaylistDetail = (playlist) => {
  return {
    type: types.SET_PLAYLIST_DETAIL,
    playlist,
  };
};
