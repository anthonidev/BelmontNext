import React from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  Path,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";

import { KeyIcon, MailIcon } from "@heroicons/react/outline";
import { IFormSignUp } from "../../utils/types/forms";

type PropsSignupForm = {
  title: string;
  type: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<IFormSignUp>;
  errors: FieldErrorsImpl<DeepRequired<IFormSignUp>>;
  htmlForm: string;
  error: boolean;
  label: Path<IFormSignUp>;
  required: boolean;
  pattern?: ValidationRule<RegExp>;
  maxLength?: number;
  minLength?: number;
};
type props = {};
const SignupInputForm = ({
  title,
  type,
  id,
  placeholder,
  register,
  errors,
  htmlForm,
  error,
  label,
  required,
  pattern,
  maxLength,
  minLength,
}: PropsSignupForm) => {
  const inputIcon = (Icon: any) => {
    return (
      <Icon
        className={`w-6  h-6 ${error ? "text-red-500" : "text-gray-500"}`}
      />
    );
  };

  return (
    <div>
      <label
        htmlFor={htmlForm}
        className={`${
          error
            ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
            : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        }`}
      >
        {title}
      </label>
      <div className="relative mb-2">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          {label === "email" ? inputIcon(MailIcon) : inputIcon(KeyIcon)}
        </div>
        <input
          type={type}
          id={id}
          autoComplete="off"
          placeholder={placeholder}
          className={`${
            error
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
              : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }  block w-full pl-10 p-2.5 `}
          {...register(label, {
            required,
            pattern,
            maxLength,
            minLength,
          })}
        />
      </div>

      {label === "password" && errors.password && (
        <p className="mt-2  mb-3  text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> La contraseña debe tener al
          menos 8 caracteres, una mayúscula, una minúscula y un número.
        </p>
      )}
      {label === "email" && errors.email && (
        <p className="mt-2 mb-3 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> Formato Incorrecto
        </p>
      )}
    </div>
  );
};
export default SignupInputForm;
