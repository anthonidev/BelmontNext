import React from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  Path,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";
import { IFormSend } from "../mail/TextAreaMail";

type PropsInputForm = {
  title: string;
  type: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<IFormSend>;
  errors: FieldErrorsImpl<DeepRequired<IFormSend>>;
  htmlForm: string;
  error: boolean;
  label: Path<IFormSend>;
  required: boolean;
  pattern?: ValidationRule<RegExp>;
  maxLength?: number;
  minLength?: number;
};

const InputMailForm = ({
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
}: PropsInputForm) => {
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
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </div>
        <input
          type={type}
          id={id}
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

      {label === "fullname" && errors.fullname && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> Formato Incorecto
        </p>
      )}
      {label === "message" && errors.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> Formato Incorecto
        </p>
      )}
    </div>
  );
};
export default InputMailForm;
