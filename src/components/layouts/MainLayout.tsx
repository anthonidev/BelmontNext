import Head from "next/head";
import tw from "twin.macro";
export type Props = {
  title: string;
  content: string;
  children: JSX.Element | null;
};
const Main = tw.main`
    h-screen bg-black
`;
const MainLayout: React.FC<Props> = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Main>{children}</Main>
    </>
  );
};
export default MainLayout;
