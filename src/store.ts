import { createStore } from "@reduxjs/toolkit";
import gameReducer from "../src/game/gameSlice";

const store = createStore(gameReducer);
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
