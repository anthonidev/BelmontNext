import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { AppDispatch, RootState } from "../../../../redux/store";
import { activateService } from "../../../../redux/api/auth";
import MainLayout from "../../../../components/layouts/MainLayout";

const Token = () => {
  const [activated, setActivated] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { uid, token } = router.query;

  const handleActivated = () => {
    if (uid !== undefined && token !== undefined)
      dispatch(activateService(uid, token));
    setActivated(true);
  };

  if (activated && !loading) router.push("/auth/login");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row md:mb-8">
      <div className="mx-auto  my-auto ">
        <h1 className="text-lg mt-5 text-gray-500">
          Para activar su cuenta pulse en el boton inferior{" "}
        </h1>

        {loading ? (
          <button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            ...
          </button>
        ) : (
          <button
            onClick={handleActivated}
            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-lg  md:text-2xl font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CheckCircleIcon className="w-6 h-6 mr-2" />
            <span>Activar cuenta</span>
          </button>
        )}
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
