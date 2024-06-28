import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import movieSlice from "../features/movies/movieSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movies: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
