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

export const setLikedSongCount = (count) => {
  return {
    type: types.SET_LIKED_SONG_COUNT,
    count,
  };
};

export const setHistoryListen = (songs) => {
  return {
    type: types.SET_HISTORY_LISTEN,
    songs,
  };
};

export const setRecommendation = (songs) => {
  return {
    type: types.SET_RECOMMENDATION,
    songs,
  };
};

export const setChart = (songs) => {
  return {
    type: types.SET_CHART,
    songs,
  };
};
