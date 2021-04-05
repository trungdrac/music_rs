import * as types from "../constants/ActionTypes";

const initialState = [];

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PLAYLIST:
      state = action.playlist;
      return [...state];

    default:
      return state;
  }
};

export default playlist;
