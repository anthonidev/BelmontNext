import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React from "react";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowPassword = ({ showPassword, setShowPassword }: Props) => {
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="absolute right-5 top-10">
      <button type="button" onClick={handleVisibility}>
        {showPassword ? (
          <EyeIcon className="h-5 w-5 text-indigo-500" />
        ) : (
          <EyeOffIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default ShowPassword;
