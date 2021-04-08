import * as types from "../constants/ActionTypes";

const initialState = [];

const song = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SONG:
      state = action.song;
      return [...state];
    default:
      return state;
  }
};

export default song;
