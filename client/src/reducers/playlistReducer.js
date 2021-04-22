import * as types from "../constants/ActionTypes";

const initialState = {
  listPlaying: [],
  playlistArea: [],
};

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIST_PLAYING:
      return { ...state, listPlaying: action.listPlaying };
    case types.SET_PLAYLIST_AREA:
      return { ...state, playlistArea: action.playlists };
    default:
      return state;
  }
};

export default playlist;
