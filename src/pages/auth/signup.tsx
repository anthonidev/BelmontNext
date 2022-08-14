import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../redux/store";
import { signup } from "../../redux/api/auth";
import Image from "next/image";
import Link from "next/link";
import { setAlert } from "../../redux/api/alert";
import MainLayout from "../../components/layouts/MainLayout";

export interface IFormSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

const Signup = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState(false);

  const [formData, setFormData] = useState<IFormSignUp>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    const item = e.currentTarget.classList;
    const esValido = e.currentTarget.validity.valid;
    console.log(esValido);

    if (esValido) {
      item.replace("border-gray-300", "border-green-300");
      item.replace("border-red-300", "border-green-300");
    } else {
      item.replace("border-gray-300", "border-red-300");
      item.replace("border-green-300", "border-red-300");
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
      console.log("no coinciden");
    } else {
      dispatch(
        signup(
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.password,
          formData.re_password
        )
      );
      setAccountCreated(true);
      window.scrollTo(0, 0);
    }
  };
  if (accountCreated) router.push("/auth/confirm");

  return (
    <div className="lg:min-h-screen min-h-fit bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <div>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className=" text-center text-3xl font-extrabold text-gray-800 ">
                  Registrate es gratis y lo seguira siendo
                </h2>
              </div>
              <p className="mt-2 text-center text-sm text-gray-600">
                O{" "}
                <Link href="/auth/login">
                  <a className='className="font-medium text-indigo-700 hover:underline hover:text-indigo-500"'>
                    ingresar si ya tienes una.
                  </a>
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor={"name"}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    Nombres
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    onChange={onChange}
                    value={formData.first_name}
                    placeholder="Nombres"
                    required
                    pattern="[a-zA-Z\s]{1,25}"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-pri-100 rounded-t-md focus:outline-none  sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor={"last_name"}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    Apellidos
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    onChange={onChange}
                    value={formData.last_name}
                    placeholder="Apellidos"
                    required
                    pattern="[a-zA-Z\s]{1,25}"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-pri-100 rounded-t-md focus:outline-none  sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor={"email"}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    value={formData.email}
                    placeholder="Correo Electrónico"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-pri-100 rounded-t-md focus:outline-none  sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor={"password"}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    Contraseña
                  </label>
                  <input
                    name={"password"}
                    type="password"
                    onChange={onChange}
                    value={formData.password}
                    placeholder="Contraseña"
                    required
                    minLength={8}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-pri-100 rounded-t-md focus:outline-none   sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor={"re_password"}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    Repetir Contraseña
                  </label>

                  <input
                    name={"re_password"}
                    type="password"
                    onChange={onChange}
                    value={formData.re_password}
                    placeholder="Repetir Contraseña"
                    required
                    minLength={8}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-pri-100 rounded-t-md focus:outline-none   sm:text-sm"
                  />
                </div>

                {/* <Submit loading={loading} text="Registrar" /> */}
                <button type="submit">Registrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={`/assets/images/portada_signup.webp`}
          layout="fill"
          alt={`Portada de login Aton`}
          quality={100}
        />
      </div>
    </div>
  );
};
Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Home Page" content="Content Page">
      {page}
    </MainLayout>
  );
};
export default Signup;
