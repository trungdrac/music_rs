import * as types from "../constants/ActionTypes";

const initialState = {
  isLoading: true,
};

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IS_LOADING_TRUE:
      return {...state, isLoading: true};
    case types.SET_IS_LOADING_FALSE:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export default playlist;
