import { combineReducers, configureStore } from "@reduxjs/toolkit";
import schoolInfoSliceReducer from "./slices/schoolInfo.slice";
import prideInfoSliceReducer from "./slices/pride.slice";
import availableReducer from "./slices/available.slice";

const combineReducer = combineReducers({
  system: schoolInfoSliceReducer,
  pride: prideInfoSliceReducer,
  ia: availableReducer,
});

export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const { getState, dispatch } = store;

export type RooteState = ReturnType<typeof getState>;
export type AppDispatch = typeof dispatch;
