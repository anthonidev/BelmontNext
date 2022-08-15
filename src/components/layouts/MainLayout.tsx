import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import {
  checkAuthenticatedService,
  loadUserService,
  refreshService,
} from "../../redux/api/auth";
import { AppDispatch } from "../../redux/store";
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
const MainLayout: React.FC<Props> = ({ title, content, children }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticatedService());
    dispatch(loadUserService());
    dispatch(refreshService());
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
