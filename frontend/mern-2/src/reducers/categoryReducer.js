export const categoryReducer = (state = { Category:[] }, action) => {
    switch (action.type) {
      case "CATEGORY_ALL":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };