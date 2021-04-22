import * as types from "../constants/ActionTypes";

const initialState = {
  songs: [],
  songDetail: {},
  songCategory: [],
};

const song = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SONGS:
      return { ...state, songs: action.songs };
    case types.SET_SONG_DETAIL:
      return { ...state, songDetail: action.song };
    case types.SET_SONG_CATEGORY:
      return { ...state, songCategory: action.songs };
    default:
      return state;
  }
};

export default song;
