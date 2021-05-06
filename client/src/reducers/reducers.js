import { combineReducers } from "redux";
import adminReducer from "./admin.reducers";

export const makeRootReducer = () => {
  return combineReducers({
    admin: adminReducer,
  });
};

export default makeRootReducer;
