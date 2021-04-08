import * as types from "../constants/ActionTypes";

export const setIsLoadingTrue = () => {
  return {
    type: types.SET_IS_LOADING_TRUE,
  };
};

export const setIsLoadingFalse = () => {
  return {
    type: types.SET_IS_LOADING_FALSE,
  };
};
