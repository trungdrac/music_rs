import * as types from "../constants/ActionTypes";

const initialState = {
  songs: [],
  songDetail: {},
  songCategory: [],
  likedSong: [],
};

const song = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SONGS:
      return { ...state, songs: action.songs };
    case types.SET_SONG_DETAIL:
      return { ...state, songDetail: action.song };
    case types.SET_SONG_CATEGORY:
      return { ...state, songCategory: action.songs };
    case types.SET_LIKED_SONG:
      return { ...state, likedSong: action.songs };
    default:
      return state;
  }
};

export default song;
