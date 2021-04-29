import * as types from "../constants/ActionTypes";

export const playAudio = () => {
  return {
    type: types.PLAY_AUDIO,
  };
};

export const pauseAudio = () => {
  return {
    type: types.PAUSE_AUDIO,
  };
};

export const setCurrentSongId = (currentSongId) => {
  return {
    type: types.SET_CURRENT_SONG_ID,
    currentSongId,
  };
};

export const setCurrentTime = (newTime) => {
  return {
    type: types.SET_CURRENT_TIME,
    newTime,
  };
};

export const setProgressPercent = (newPercent) => {
  return {
    type: types.SET_PROGRESS_PERCENT,
    newPercent,
  };
};

export const setCurrentIndex = (newIndex) => {
  return {
    type: types.SET_CURRENT_INDEX,
    newIndex,
  };
};

export const setDuration = (newDuration) => {
  return {
    type: types.SET_DURATION,
    newDuration,
  };
};

export const toggleRepeat = () => {
  return {
    type: types.TOGGLE_REPEAT,
  };
};

export const toggleRandom = () => {
  return {
    type: types.TOGGLE_RANDOM,
  };
};

export const setVolume = (newVolume) => {
  return {
    type: types.SET_VOLUME,
    newVolume,
  };
};

export const setListPlaying = (listPlaying) => {
  return {
    type: types.SET_LIST_PLAYING,
    listPlaying,
  };
};