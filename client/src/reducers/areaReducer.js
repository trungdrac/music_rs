import * as types from "../constants/ActionTypes";

const initialState = [];

const area = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AREAS:
      state = action.areas;
      return [...state];
    default:
      return state;
  }
};

export default area;
