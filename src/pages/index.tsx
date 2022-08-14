import { ReactElement } from "react";
import AlertManage from "../components/alert/Alert";
import MainLayout from "../components/layouts/MainLayout";
import TextAreaMail from "../components/mail/TextAreaMail";
import { ContainerIndex } from "../components/style/page";
import type { NextPageWithLayout } from "./_app";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

// const Input = tw.input`
//     text-center border h-28
// `;
// const MyDiv = styled.div`
//   background: gold;
//   font-size: 5rem;
//   margin-top: 10px;
// `;
const Home: NextPageWithLayout = (): JSX.Element => {
  return (
    <ContainerIndex>
      <h1 className="my-10 text-center tracking-wider border-b-2 p-2 w-10  text-white font-bold text-3xl">
        Send Mail
      </h1>
      <TextAreaMail />
      <div className="w-full">
        <AlertManage />
      </div>
    </ContainerIndex>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Home Page" content="Content Page">
      {page}
    </MainLayout>
  );
};

export default Home;
