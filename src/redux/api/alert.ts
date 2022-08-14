import { AppDispatch } from "../store";
import { offAlert, onAlert } from "../slices/alertSlice";
import { AlertType } from "../../utils/types/interfaces";

export const setAlert =
  (msg: string, type: AlertType, timeout = 4000) =>
  (dispatch: AppDispatch) => {
    dispatch(onAlert({ msg, type }));
    return setTimeout(() => dispatch(offAlert()), timeout);
  };
