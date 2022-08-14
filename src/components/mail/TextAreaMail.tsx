import { Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { sendMailService } from "../../redux/api/contact";
import { AppDispatch } from "../../redux/store";
import InputForm from "../form/InputForm";
import InputMailForm from "../form/InputMailForm";

type Props = {};

export interface IFormSend {
  fullname: string;
}

const TextAreaMail = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSend>();
  const onSubmit: SubmitHandler<IFormSend> = (data) => {
    console.log(data.fullname);

    dispatch(sendMailService(data.fullname));
  };
  return (
    <form className="max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
      {
        <InputMailForm
          title="Fullname"
          id="fullname"
          type="text"
          placeholder="fullname"
          register={register}
          errors={errors}
          htmlForm="fullname"
          error={errors.fullname ? true : false}
          label="fullname"
          required
        />
      }

      <button
        type="submit"
        className="inline-flex mt-5 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Send Mail
      </button>
    </form>
  );
};

export default TextAreaMail;
