import * as types from "../constants/ActionTypes";

export const setSongs = (songs) => {
  return {
    type: types.SET_SONGS,
    songs,
  };
};

export const setSongDetail = (song) => {
  return {
    type: types.SET_SONG_DETAIL,
    song,
  };
};

export const setSongCategory = (songs) => {
  return {
    type: types.SET_SONG_CATEGORY,
    songs,
  };
};
