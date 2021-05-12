import * as types from "../constants/ActionTypes";

const initialState = {
  userId: null,
  username: null,
  userToken: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      state = action.user;
      return { ...state };
    default:
      return state;
  }
};

export default user;
