// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
