import * as types from "../constants/ActionTypes";

export const setAreas = (areas) => {
  return {
    type: types.SET_AREAS,
    areas,
  };
};