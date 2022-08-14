import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import { check_authenticated, load_user, refresh } from "../../redux/api/auth";
import { AppDispatch } from "../../redux/store";
import AlertManage from "../alert/Alert";
import FooterComponent from "../navigations/FooterComponent";
import NavbarComponent from "../navigations/NavbarComponent";
export type Props = {
  title: string;
  content: string;
  children: JSX.Element | null;
};
const Main = tw.main`
    h-screen bg-gray-900 
`;
const MainLayout: React.FC<Props> = ({ title, content, children }) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(check_authenticated());
    dispatch(load_user());
    dispatch(refresh());
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>

      <Main>
        <div className="sticky bg-gray-800 ">
          <NavbarComponent />
        </div>
        {children}
      </Main>
      <div className=" bg-gray-800 ">
        <FooterComponent />
      </div>
    </>
  );
};
export default MainLayout;
