import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
const store = configureStore({
  reducer: {
    employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;