import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import AlertManage from "../../components/alert/Alert";
import InputForm from "../../components/form/InputForm";
import { Container, Layout } from "../../components/style/page";
import { loginService } from "../../redux/api/auth";
import { AppDispatch } from "../../redux/store";

type Props = {};

export interface IFormInput {
  email: string;
  password: string;
}

const PrimaryButton = tw.button`text-white mx-auto   bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:(ring-4 outline-none ring-blue-300)  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`;

const login = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("probando", data.email, data.password);
    dispatch(loginService(data.email, data.password));
  };
  return (
    <Layout>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-w-xl border-2 w-full p-5 rounded-2xl flex justify-center flex-col"
        >
          <h1 className="text-center text-2xl text-white">LOGIN JWT</h1>
          <div>
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
                // pattern={/^[A-Za-z0-9._%+-]+@gmail\.com$/}
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
            <a className=" dark:text-blue-400" href="/">
              forgot password?
            </a>
            <PrimaryButton type="submit">Login</PrimaryButton>
          </div>
        </form>
        <AlertManage />
      </Container>
    </Layout>
  );
};

export default login;
