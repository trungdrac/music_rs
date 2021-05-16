import * as types from "../constants/ActionTypes";

export const setSuggestion = (suggestion) => {
  return {
    type: types.SET_SEARCH_SUGGEST,
    suggestion,
  };
};

export const setResult = (result) => {
  return {
    type: types.SET_SEARCH_RESULT,
    result,
  };
};

export const setFilterResult = (result) => {
  return {
    type: types.SET_FILTER_RESULT,
    result,
  };
};
