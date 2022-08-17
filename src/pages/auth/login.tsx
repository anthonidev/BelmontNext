import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import tw from "twin.macro";
import AlertManage from "../../components/alert/Alert";
import InputForm from "../../components/form/InputForm";
import MainLayout from "../../components/layouts/MainLayout";
import { Container, Layout } from "../../components/style/page";
import { loginService } from "../../redux/api/auth";
import { AppDispatch, RootState } from "../../redux/store";

export interface IFormInput {
  email: string;
  password: string;
}

const PrimaryButton = tw.button`w-32 text-white mx-auto bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:(ring-4 outline-none ring-blue-300)  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`;

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(loginService(data.email, data.password));
  };
  useEffect(() => {
    if (isAuthenticated) push("/dashboard");
  }, [isAuthenticated]);

  return (
    <Layout>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={` max-w-xl border-2 w-full p-3 rounded-2xl flex justify-center flex-col ${
            errors?.email || errors?.password
              ? "border-red-500"
              : "border-gray-800"
          }`}
        >
          <h1 className="text-center uppercase my-4 text-2xl text-white">
            Bienvenido
          </h1>

          <p className="text-center text-gray-400 text-xs">
            No tienes una cuenta?
            <Link href={"/auth/signup"}>
              <a className="text-indigo-500 font-bold ml-2">Registrate</a>
            </Link>
          </p>
          <div className="flex flex-col space-y-4">
            {
              <InputForm
                title="Email"
                id="email"
                type="email"
                placeholder="Email"
                register={register}
                errors={errors}
                htmlForm="email"
                error={errors.email ? true : false}
                label="email"
                required
              />
            }
            {
              <InputForm
                title="Password"
                id="password"
                type="password"
                placeholder="your password"
                register={register}
                errors={errors}
                htmlForm="password"
                error={errors.password ? true : false}
                label="password"
                required
              />
            }
          </div>

          <div className="flex justify-between mt-5 items-center">
            <a className=" dark:text-indigo-500  text-sm" href="/">
              ¿Olvidaste tu contraseña?
            </a>
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
              <PrimaryButton type="submit">Ingresar</PrimaryButton>
            )}
          </div>
        </form>
        <AlertManage />
      </Container>
    </Layout>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title="Ingresar | Belnmont"
      content="Iniciar Session en Belnmont"
    >
      {page}
    </MainLayout>
  );
};
export default Login;
