import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertState } from "../../utils/types/interfaces";

const initialState: AlertState = {
  msg: null,
  type: null,
};

export const alertSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    onAlert: (state: AlertState, action: PayloadAction<AlertState>) => {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
    offAlert: (state: AlertState) => {
      state.msg = null;
      state.type = null;
    },
  },
});

export const { onAlert, offAlert } = alertSlice.actions;

export default alertSlice.reducer;
