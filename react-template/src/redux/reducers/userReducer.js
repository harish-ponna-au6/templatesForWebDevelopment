const initialState = {
  user: {
    name: "harish"
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state };

    default:
      return { ...state };
  }
};

export { userReducer };
