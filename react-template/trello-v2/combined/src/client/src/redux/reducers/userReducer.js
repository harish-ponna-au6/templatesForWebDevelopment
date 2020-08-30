import { LOGIN_OR_REGISTER, LOGOUT, CURRENT_TRELLO_ID } from "../actionTypes";

const userState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
};

const userReducer = (state = userState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_OR_REGISTER:
      return { isLoggedIn: true };
    case LOGOUT:
      return { isLoggedIn: false };

    default:
      return state;
  }
};

export { userReducer };
