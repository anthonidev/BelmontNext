import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { activate } from "../../../redux/api/auth";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/solid";
import MainLayout from "../../../components/layouts/MainLayout";

const Token = () => {
  const [activated, setActivated] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { uid, token } = router.query;

  const activate_account = () => {
    if (uid !== undefined && token !== undefined)
      dispatch(activate(uid, token));
    setActivated(true);
  };

  if (activated && !loading) router.push("/auth/login");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row md:mb-8">
      <div className="sm:w-1/2  my-auto ">
        <h1 className="text-lg mt-5 text-gray-500">
          Para activar su cuenta pulse en el boton inferior{" "}
        </h1>

        {loading ? (
          <button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            ...
          </button>
        ) : (
          <button
            onClick={activate_account}
            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-lg  md:text-2xl font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CheckCircleIcon className="w-6 h-6 mr-2" />
            <span>Activar cuenta</span>
          </button>
        )}
      </div>
      <div className="sm:w-1/2  w-full">
        <Image
          src={`/assets/images/activate.webp`}
          layout="responsive"
          alt={`logo`}
          className="object-cover"
          width="100"
          height="70"
        />
      </div>
    </div>
  );
};

Token.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Home Page" content="Content Page">
      {page}
    </MainLayout>
  );
};

export default Token;
