import * as types from "../constants/ActionTypes";

const initialState = {
  isPlaying: false,
  isRandom: false,
  repeat: "none",
  volume: 1,
  currentIndex: 0,
  currentSongId: "",
  progressPercent: 0,
  currentTime: 0,
  duration: 0,
  listPlaying: [],
};
const player = (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY_AUDIO:
      return { ...state, isPlaying: true };
    case types.PAUSE_AUDIO:
      return { ...state, isPlaying: false };
    case types.SET_CURRENT_TIME:
      return { ...state, currentTime: action.newTime };
    case types.SET_CURRENT_SONG_ID:
      return { ...state, currentSongId: action.currentSongId };
    case types.SET_PROGRESS_PERCENT:
      return { ...state, progressPercent: action.newPercent };
    case types.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.newIndex };
    case types.SET_DURATION:
      return { ...state, duration: action.newDuration };
    case types.SET_REPEAT:
      return { ...state, repeat: action.value };
    case types.TOGGLE_RANDOM:
      return { ...state, isRandom: !state.isRandom };
    case types.SET_VOLUME:
      return { ...state, volume: action.newVolume };
    case types.SET_LIST_PLAYING:
      return { ...state, listPlaying: action.listPlaying };
    default:
      return state;
  }
};

export default player;
