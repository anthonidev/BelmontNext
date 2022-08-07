import styled from "@emotion/styled/macro";
import { NextPage } from "next";
import { ReactElement } from "react";
import tw from "twin.macro";
import MainLayout from "../components/layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

const Input = tw.input`
    text-center border h-28
`;
const MyDiv = styled.div`
  background: gold;
  font-size: 5rem;
  margin-top: 10px;
`;
const Home: NextPageWithLayout = (): JSX.Element => {
  return (
    <div className="">
      <Input placeholder="box" />
      <MyDiv>Test Text</MyDiv>
    </div>
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
