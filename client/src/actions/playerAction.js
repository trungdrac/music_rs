import * as types from "../constants/ActionTypes";

export const showPlayer = () => {
  return {
    type: types.SHOW_PLAYER,
  };
};

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

export const setCurrentSong = (currentSongId) => {
  return {
    type: types.SET_CURRENT_SONG,
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

export const setIsFirstSongTrue = () => {
  return {
    type: types.SET_IS_FIRST_SONG_TRUE,
  };
};

export const setIsFirstSongFalse = () => {
  return {
    type: types.SET_IS_FIRST_SONG_FALSE,
  };
};

export const setLoadedSongs = (newLoadedSongs) => {
  return {
    type: types.SET_LOADED_SONGS,
    newLoadedSongs,
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
