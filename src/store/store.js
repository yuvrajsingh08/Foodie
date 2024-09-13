import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import userSlice from "./user";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

// Define the persist config object for redux-persist
const persistConfig = {
  key: "root", // the key to the persist in localStorage
  storage, // defaults to localStorage for web
  whitelist: ["auth", "user"], // Specify which reducers to persist
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
