import { createSlice } from "@reduxjs/toolkit";
import { ContactState } from "../../utils/types/interfaces";

const initialState: ContactState = {
  loading: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    on_loading: (state: ContactState) => {
      state.loading = true;
    },
    off_loading: (state: ContactState) => {
      state.loading = false;
    },
  },
});

export const { on_loading, off_loading } = contactSlice.actions;

export default contactSlice.reducer;
