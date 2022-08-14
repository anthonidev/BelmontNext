import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import contactReducer from "./slices/contactSlice";
import campaignReducer from "./slices/campaignSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    contact: contactReducer,
    camapaign: campaignReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
