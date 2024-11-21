import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "../features/match/matchSlice";

const store = configureStore({
  reducer: {
    match: matchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
