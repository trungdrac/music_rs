import * as types from "../constants/ActionTypes";

const initialState = {
  playlistArea: [],
  myPlaylist: null,
  myPlaylistCount: null,
  playlistDetail: {},
};

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLAYLIST_AREA:
      return { ...state, playlistArea: action.playlists };
    case types.SET_MY_PLAYLIST:
      return { ...state, myPlaylist: action.playlists };
    case types.SET_MY_PLAYLIST_COUNT:
      return { ...state, myPlaylistCount: action.count };
    case types.SET_PLAYLIST_DETAIL:
      return { ...state, playlistDetail: action.playlist };
    default:
      return state;
  }
};

export default playlist;
