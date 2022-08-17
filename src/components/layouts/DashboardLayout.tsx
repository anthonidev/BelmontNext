import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";
import {
  checkAuthenticatedService,
  loadUserService,
  refreshService,
} from "../../redux/api/auth";
import { AppDispatch, RootState } from "../../redux/store";
import FooterComponent from "../navigations/FooterComponent";
import NavbarComponent from "../navigations/NavbarComponent";
export type Props = {
  title: string;
  content: string;
  children: JSX.Element | null;
};
const Main = tw.main`
    h-screen bg-blue-900 
`;
const DashboradLayout: React.FC<Props> = ({
  title,
  content,
  children,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticatedService());
    dispatch(loadUserService());
    dispatch(refreshService());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated);

  const { push } = useRouter();
  useEffect(() => {
    if (!isAuthenticated) push("/auth/login");
  }, [isAuthenticated]);

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
export default DashboradLayout;
