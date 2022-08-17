import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../redux/store";
import { signupService } from "../../redux/api/auth";
import MainLayout from "../../components/layouts/MainLayout";
import { Container, Layout } from "../../components/style/page";
import { useForm, SubmitHandler } from "react-hook-form";
import SignupInputForm from "../../components/form/InputSignup";
import { PrimaryButton } from "../../components/button/buttonSltyle";
import Link from "next/link";
import AlertManage from "../../components/alert/Alert";
import { IFormSignUp } from "../../utils/types/forms";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const { loading, redirectConfirmed, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignUp>();
  const onSubmit: SubmitHandler<IFormSignUp> = (data) => {
    dispatch(
      signupService(
        data.email,
        data.password,
        data.re_password,
        data.acept_terms
      )
    );
  };

  useEffect(() => {
    if (redirectConfirmed) push("/auth/confirm");
  }, [redirectConfirmed]);
  useEffect(() => {
    if (isAuthenticated) push("/dashboard");
  }, [isAuthenticated]);
  return (
    <Layout>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={` max-w-xl border-2 w-full p-5 rounded-2xl flex justify-center flex-col ${
            errors?.email || errors?.password
              ? "border-red-500"
              : "border-gray-800"
          }`}
        >
          <h1 className="text-center uppercase my-4 text-2xl text-white ">
            Registrate
          </h1>
          <p className="text-center text-gray-400 text-xs">
            ¿Ya tienes una cuenta?
            <Link href={"/auth/login"}>
              <a className="text-indigo-500 ml-2">Inicia Sesión</a>
            </Link>
          </p>
          <div className="flex flex-col space-y-4">
            {
              <SignupInputForm
                title="Email"
                id="email"
                type="email"
                placeholder="Email (loe@gmail.com)"
                register={register}
                errors={errors}
                htmlForm="email"
                error={errors.email ? true : false}
                label="email"
                required
              />
            }
            {
              <SignupInputForm
                title="Contraseña"
                id="password"
                type="password"
                placeholder="contraseña"
                register={register}
                errors={errors}
                htmlForm="password"
                error={errors.password ? true : false}
                label="password"
                minLength={8}
                required
                pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
              />
            }

            {/* 123Ab234 Travis@gmail.com */}
            {
              <SignupInputForm
                title="Repetir contraseña"
                id="re_password"
                type="password"
                placeholder="repetir contraseña"
                register={register}
                errors={errors}
                htmlForm="re_password"
                error={errors.re_password ? true : false}
                label="re_password"
                minLength={8}
                pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
                required
              />
            }
          </div>
          <div className="flex justify-between mt-5 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...register("acept_terms")}
              id="acept_terms"
            />
            <p className=" ">
              <span className="text-white"> Acepto los</span>
              <Link href={"/belmont/terminos-y-condiciones"}>
                <a className="ml-1 text-indigo-500">terminos y condiciones</a>
              </Link>
            </p>

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
              <PrimaryButton type="submit">Registrar</PrimaryButton>
            )}
          </div>
        </form>
        <AlertManage />
      </Container>
    </Layout>
  );
};
Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title="Registrate | Belnmont"
      content="registrate gratis y despega tu negocio"
    >
      {page}
    </MainLayout>
  );
};
export default Signup;
