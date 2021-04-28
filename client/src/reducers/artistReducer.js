import * as types from "../constants/ActionTypes";

const initialState = {
  artistArea: [],
};

const artist = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ARTIST_AREA:
      return { ...state, artistArea: action.artists };
    default:
      return state;
  }
};

export default artist;
