import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CampaignState,
  ListClientResponse,
  ListItemsClientResponse,
} from "../../utils/types/interfaces";

const initialState: CampaignState = {
  list: {
    count: 0,
    next: null,
    previous: null,
    results: null,
  },
  list_items: {
    count: 0,
    next: null,
    previous: null,
    results: null,
  },
};

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    listClientOK: (
      state: CampaignState,
      action: PayloadAction<ListClientResponse>
    ) => {
      state.list = action.payload;
    },
    listClientFail: (state: CampaignState) => {
      state.list = initialState.list;
    },
    listItemsClientOK: (
      state: CampaignState,
      action: PayloadAction<ListItemsClientResponse>
    ) => {
      state.list_items = action.payload;
    },
    listItemsClientFail: (state: CampaignState) => {
      state.list_items = initialState.list_items;
    },
  },
});

export const {
  listClientOK,
  listClientFail,
  listItemsClientOK,
  listItemsClientFail,
} = campaignSlice.actions;

export default campaignSlice.reducer;
