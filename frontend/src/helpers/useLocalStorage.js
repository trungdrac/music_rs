import { LOCAL_STORAGE_KEY } from "../constants/Config";

export const loadState = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(persistedState) || {};
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const persistedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, persistedState);
  } catch (err) {
    return undefined;
  }
};
