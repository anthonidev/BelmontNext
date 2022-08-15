/* eslint-disable no-unused-vars */
import axios from "axios";
import { getStoreLocal } from "../../utils/helpers/helpStore";
import {
  loginOk,
  failClear,
  loadingOn,
  loadingOff,
  loadedUser,
  userFail,
  authenticatedOk,
  refreshOk,
  redirectConfirmed,
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

const checkAuthenticatedService = () => async (dispatch: AppDispatch) => {
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
        dispatch(authenticatedOk());
      })
      .catch((err) => {
        dispatch(failClear());
        console.log(err);
      });
  }
};

const loadUserService = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("access")) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${getStoreLocal("access") || "default"}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch(loadedUser(res.data));
      })
      .catch((err) => {
        dispatch(userFail());
      });
  } else {
    dispatch(userFail());
  }
};

const loginService =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingOn());

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(loginOk(res.data));
        dispatch(setAlert("Bienvenido", AlertType.Success));
      })
      .catch((err) => {
        console.log(err.code);

        dispatch(failClear());
        if (err.code !== "ERR_NETWORK")
          dispatch(setAlert(err.response.data.detail, AlertType.Error));
        else
          dispatch(
            setAlert("Error de conexión, intentar más tarde", AlertType.Error)
          );
      })
      .finally(() => {
        dispatch(loadingOff());
      });
  };

const refreshService = () => async (dispatch: AppDispatch) => {
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
        dispatch(refreshOk(res.data));
      })
      .catch((err) => {
        dispatch(failClear());
      });
  } else {
    dispatch(failClear());
  }
};

const signupService =
  (
    email: string,
    password: string,
    // eslint-disable-next-line camelcase
    re_password: string,
    // eslint-disable-next-line camelcase
    acept_terms: boolean
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
    // eslint-disable-next-line camelcase
    if (acept_terms) {
      // eslint-disable-next-line camelcase
      if (password === re_password) {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
            JSON.stringify({
              email,
              password,
              // eslint-disable-next-line camelcase
              re_password,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            dispatch(redirectConfirmed());
            dispatch(
              setAlert("Usuario creado correctamente", AlertType.Success)
            );
            setAlert(
              "Te enviamos un correo, por favor activa tu cuenta.",
              AlertType.Info
            );
          })
          .catch((err) => {
            console.log(err);

            if (err.response.data.password) {
              err.response.data.password.map((error: string) => {
                dispatch(setAlert(error, AlertType.Error));
              });
            } else if (err.response.data.email) {
              err.response.data.email.map((error: string) => {
                dispatch(setAlert(error, AlertType.Error));
              });
            } else {
              dispatch(
                setAlert(
                  "Error de conexión, intente más tarde",
                  AlertType.Error
                )
              );
            }
          });
      } else {
        dispatch(setAlert("Las contraseñas no coinciden", AlertType.Error));
      }
    } else {
      dispatch(
        setAlert("Debes aceptar los terminos y condiciones", AlertType.Warning)
      );
    }
    dispatch(loadingOff());
  };
const activateService =
  (uid: string | string[] | undefined, token: string | string[] | undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
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
    dispatch(loadingOff());
  };

const logoutService = () => (dispatch: AppDispatch) => {
  dispatch(failClear());
  //   dispatch(setAlert("Succesfully logged out", "green"));
};
const resetPasswordService =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
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
    dispatch(loadingOff());
  };

const resetPasswordConfirm =
  (
    uid: string | string[] | undefined,
    token: string | string[] | undefined,
    // eslint-disable-next-line camelcase
    new_password: string,
    // eslint-disable-next-line camelcase
    re_new_password: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(loadingOn());

    // eslint-disable-next-line camelcase
    if (new_password === re_new_password) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password_confirm/`,
          JSON.stringify({
            uid,
            token,
            // eslint-disable-next-line camelcase
            new_password,
            // eslint-disable-next-line camelcase
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
    dispatch(loadingOff());
  };

export {
  checkAuthenticatedService,
  loadUserService,
  loginService,
  refreshService,
  signupService,
  activateService,
  resetPasswordService,
  resetPasswordConfirm,
  logoutService,
};
