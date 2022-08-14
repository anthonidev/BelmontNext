import axios from "axios";
import { getStoreLocal } from "../../utils/helpers/helpStore";
import { off_loading, on_loading } from "../slices/contactSlice";
import { AppDispatch } from "../store";
import { setAlert } from "./alert";
enum AlertType {
  Success = "success",
  Error = "failure",
  Warning = "warning",
  Info = "info",
  Gray = "gray",
}
export const sendMailService =
  (fullname: string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mail/send/marketing`,
        JSON.stringify({ fullname }),
        {
          headers: {
            Accept: "application/json",
            Authorization: `JWT ${getStoreLocal("access")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(setAlert("Enviado", AlertType.Success));
      })
      .catch((err) => {
        dispatch(setAlert("Error al enviar Correo", AlertType.Error));
      })
      .finally(() => {
        dispatch(off_loading());
      });
  };
