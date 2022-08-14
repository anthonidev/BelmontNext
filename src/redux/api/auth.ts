import axios from "axios";
import { getStoreLocal } from "../../utils/helpers/helpStore";
import {
  authenticated_ok,
  fail_clear,
  fail_user,
  loaded_user,
  login_ok,
  off_loading,
  on_loading,
  refresh_ok,
} from "../slices/authSlice";
import { AppDispatch } from "../store";
import { setAlert } from "./alert";
enum AlertType {
  Success = "success",
  Error = "failure",
  Warning = "warning",
  Info = "info",
  Gray = "gray",
}

export const check_authenticated = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("access")) {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/verify/`,
        JSON.stringify({ token: getStoreLocal("access") }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(authenticated_ok());
      })
      .catch((err) => {
        dispatch(fail_clear());
        console.log(err);
      });
  }
};

export const load_user = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("access")) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${getStoreLocal("access") || "default"}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch(loaded_user(res.data));
      })
      .catch((err) => {
        dispatch(fail_user());
      });
  } else {
    dispatch(fail_user());
  }
};

export const loginService =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(login_ok(res.data));
        dispatch(setAlert("Bienvenido", AlertType.Success));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fail_clear());
        dispatch(setAlert("Credinciales incorectas", AlertType.Error));
      })
      .finally(() => {
        dispatch(off_loading());
      });
  };

export const refresh = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("refresh")) {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/refresh/`,
        JSON.stringify({
          refresh: getStoreLocal("refresh"),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(refresh_ok(res.data));
      })
      .catch((err) => {
        dispatch(fail_clear());
      });
  } else {
    dispatch(fail_clear());
  }
};

export const signup =
  (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(on_loading());

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
        JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          re_password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // dispatch(setAlert("Usuario creado correctamente", "green"));
        // dispatch(
        //   setAlert(
        //     "Te enviamos un correo, por favor activa tu cuenta.",
        //     "green"
        //   )
        // );
      })
      .catch((err) => {
        if (err.response.data.password) {
          err.response.data.password.map((error: string) => {
            // dispatch(setAlert(error, "red"));
          });
        } else if (err.response.data.email) {
          err.response.data.email.map((error: string) => {
            // dispatch(setAlert(error, "red"));
          });
        } else {
          //   dispatch(setAlert("Error al crear usuario", "red"));
        }
      });

    dispatch(off_loading());
  };
export const activate =
  (uid: string | string[] | undefined, token: string | string[] | undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(on_loading());
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/activation/`,
        JSON.stringify({
          uid,
          token,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // dispatch(setAlert("Cuenta activada!", "green"));
      })
      .catch((err) => {
        // dispatch(setAlert("Error al crear cuenta", "red"));
      });
    dispatch(off_loading());
  };

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(fail_clear());
  //   dispatch(setAlert("Succesfully logged out", "green"));
};

export const reset_password =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password/`,
        JSON.stringify({ email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // dispatch(setAlert("Te enviamos un correo, revisa tu bandeja", "green"));
      })
      .catch((err) => {
        // dispatch(setAlert("Error en el servidor, intente mas tarde", "red"));
      });
    dispatch(off_loading());
  };

export const reset_password_confirm =
  (
    uid: string | string[] | undefined,
    token: string | string[] | undefined,
    new_password: string,
    re_new_password: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(on_loading());

    if (new_password === re_new_password) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password_confirm/`,
          JSON.stringify({
            uid,
            token,
            new_password,
            re_new_password,
          }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          //   dispatch(setAlert("Tu clave ha sido cambiada con exito", "green"));
        })
        .catch((err) => {
          //   dispatch(setAlert("Error en el servidor", "red"));
        });
    } else {
      //   dispatch(setAlert("Las contraseñas no coinciden", "red"));
    }
    dispatch(off_loading());
  };
