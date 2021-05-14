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

export const setMyPlaylistCount = (count) => {
  return {
    type: types.SET_MY_PLAYLIST_COUNT,
    count,
  };
};

export const setPlaylistDetail = (playlist) => {
  return {
    type: types.SET_PLAYLIST_DETAIL,
    playlist,
  };
};
