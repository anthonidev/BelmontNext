import axios from "axios";
import { getStoreLocal } from "../../utils/helpers/helpStore";
import {
  listClientFail,
  listClientOK,
  listItemsClientFail,
  listItemsClientOK,
} from "../slices/campaignSlice";
import { AppDispatch } from "../store";

export const get_listClient = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("access")) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/campaign/`, {
        headers: {
          Authorization: `JWT ${getStoreLocal("access") || "default"}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => dispatch(listClientOK(data)))
      .catch((err) => dispatch(listClientFail()));
  } else {
    dispatch(listClientFail());
  }
};
export const get_ItemsListClient =
  (slug: string) => async (dispatch: AppDispatch) => {
    if (getStoreLocal("access")) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/campaign/detail-list/${slug}`,
          {
            headers: {
              Authorization: `JWT ${getStoreLocal("access") || "default"}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => dispatch(listItemsClientOK(data)))
        .catch((err) => dispatch(listItemsClientFail()));
    } else {
      dispatch(listClientFail());
    }
  };
