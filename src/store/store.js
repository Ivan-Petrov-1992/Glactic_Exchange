import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./reducer/systemSlice";

export const store = configureStore({
  reducer: {
    sys: systemReducer,
  },
});
