import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import errorReducer from "./errors/error.reducer";
import shopReducer from "./shop/shop.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  shop: shopReducer
});

export default rootReducer;
