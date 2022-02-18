import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducers";
import { categoryReducer } from "./categoryReducer";
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  category:categoryReducer
});

export default rootReducer;