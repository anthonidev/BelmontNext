import { MailIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import AlertManage from "../../../components/alert/Alert";
import { PrimaryButton } from "../../../components/button/buttonSltyle";
import MainLayout from "../../../components/layouts/MainLayout";
import { Container, Layout } from "../../../components/style/page";
import { resetPasswordService } from "../../../redux/api/auth";
import { AppDispatch, RootState } from "../../../redux/store";

export interface IFormInput {
  email: string;
}

const ForgotPassword = () => {
  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(resetPasswordService(data.email));
  };

  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated) push("/dashboard");
  }, [isAuthenticated]);

  return (
    <Layout>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={` max-w-xl border-2 w-full p-3 rounded-2xl flex justify-center flex-col ${
            errors?.email ? "border-red-500" : "border-gray-800"
          }`}
        >
          <h1 className="text-center uppercase my-4 text-2xl text-white">
            Recuperar contraseña
          </h1>
          <div>
            <label
              htmlFor={"email"}
              className={`${
                errors.email
                  ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                  : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              }`}
            >
              Email
            </label>
            <div className="relative mb-2">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MailIcon
                  className={`w-6  h-6 ${
                    errors.email ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Email"
                className={`${
                  errors.email
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }  block w-full pl-10 p-2.5 `}
                {...register("email", {
                  required: true,
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-2 mb-3 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> Formato Incorrecto
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            {loading ? (
              <PrimaryButton disabled>
                <ClipLoader
                  className="w-auto "
                  color="#ffffff"
                  loading={loading}
                  size={15}
                />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit">Enviar correo</PrimaryButton>
            )}
          </div>
        </form>
        <AlertManage />
      </Container>
    </Layout>
  );
};
ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Reset Password | Belnmont" content="reset your password">
      {page}
    </MainLayout>
  );
};
export default ForgotPassword;
