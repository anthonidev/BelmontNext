import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import AlertManage from "../../components/alert/Alert";
import MainLayout from "../../components/layouts/MainLayout";
import { Container, Layout } from "../../components/style/page";
import { RootState } from "../../redux/store";

const Confirm = () => {
  const { push } = useRouter();
  const { redirectConfirmed } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!redirectConfirmed) push("/auth/login");
  }, [redirectConfirmed]);

  return (
    <Layout>
      <Container>
        <h1 className="text-center text-2xl max-w-lg m-10 text-gray-400 ">
          Se ha enviado un correo para confirmar tu cuenta, por favor revise su
          bandeja de entrada.
        </h1>
        <AlertManage />
      </Container>
    </Layout>
  );
};
Confirm.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title="Revisa tu correo | Belnmont"
      content="Se ha enviado un correo para confirmar tu cuenta, por favor revise su bandeja de entrada."
    >
      {page}
    </MainLayout>
  );
};
export default Confirm;
