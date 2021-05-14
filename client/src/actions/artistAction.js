import * as types from "../constants/ActionTypes";

export const setArtistArea = (artists) => {
  return {
    type: types.SET_ARTIST_AREA,
    artists,
  };
};

export const setArtistDetail = (artist) => {
  return {
    type: types.SET_ARTIST_DETAIL,
    artist,
  };
};
