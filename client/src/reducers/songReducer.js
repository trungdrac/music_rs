import * as types from "../constants/ActionTypes";

const initialState = {
  songs: [],
  songDetail: {},
  songCategory: [],
  historyListen: [],
  likedSongCount: null,
  recommendation: null,
  chart: [],
};

const song = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SONGS:
      return { ...state, songs: action.songs };
    case types.SET_SONG_DETAIL:
      return { ...state, songDetail: action.song };
    case types.SET_SONG_CATEGORY:
      return { ...state, songCategory: action.songs };
    case types.SET_LIKED_SONG_COUNT:
      return { ...state, likedSongCount: action.count };
    case types.SET_HISTORY_LISTEN:
      return { ...state, historyListen: action.songs };
    case types.SET_RECOMMENDATION:
      return { ...state, recommendation: action.songs };
    case types.SET_CHART:
      return { ...state, chart: action.songs };
    default:
      return state;
  }
};

export default song;
