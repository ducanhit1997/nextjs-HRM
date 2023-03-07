import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import userReducer from "./userReducer";
const store = configureStore({
  reducer: {
    employeeReducer,
    userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;