import * as types from "../constants/ActionTypes";

const initialState = {
  playlistArea: [],
};

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLAYLIST_AREA:
      return { ...state, playlistArea: action.playlists };
    default:
      return state;
  }
};

export default playlist;
