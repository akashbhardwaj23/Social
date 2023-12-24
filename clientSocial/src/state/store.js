import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./slice.js"
import {
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE
  } from "redux-persist"
  import storage from "redux-persist/lib/storage";
  
  
  
  // to store all the data in local storage in the browser
  
  export const persistConfig = { key: "root", storage, version: 1 }
  export const persistedReducer = persistReducer(persistConfig, sliceReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleeare) => 
        getDefaultMiddleeare({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
});