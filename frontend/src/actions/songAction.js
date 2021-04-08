import * as types from "../constants/ActionTypes";

export const setSong = (song) => {
  return {
    type: types.SET_SONG,
    song,
  };
};
