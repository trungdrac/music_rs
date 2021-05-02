import * as types from "../constants/ActionTypes";

const initialState = {
  suggestion: [[], [], []],
  result: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_SUGGEST:
      return { ...state, suggestion: action.suggestion };
    case types.SET_SEARCH_RESULT:
      return { ...state, result: action.result };
    default:
      return state;
  }
};

export default search;
