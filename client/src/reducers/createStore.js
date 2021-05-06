import { applyMiddleware, compose, createStore as createReduxStore } from "redux";
import makeRootReducer from "./reducers";

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(makeRootReducer(), initialState, composeEnhancers(applyMiddleware(), ...enhancers));
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
