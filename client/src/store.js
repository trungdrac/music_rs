import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadState, saveState } from "./helpers/useLocalStorage";

const persistedState = loadState();

const middleware = [thunk];
const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;
const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middleware), devTools)
);
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
