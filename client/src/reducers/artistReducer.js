import * as types from "../constants/ActionTypes";

const initialState = {
  artistArea: [],
  artistDetail: {},
};

const artist = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ARTIST_AREA:
      return { ...state, artistArea: action.artists };
    case types.SET_ARTIST_DETAIL:
      return { ...state, artistDetail: action.artist };
    default:
      return state;
  }
};

export default artist;
