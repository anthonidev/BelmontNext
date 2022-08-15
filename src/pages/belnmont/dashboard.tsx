import React, { ReactElement } from "react";
import MainLayout from "../../components/layouts/MainLayout";

const Dashboard = () => {
  return <div>dashborad</div>;
};
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title="Dashboard | Belnmont"
      content="Tablero de mando para la inteligencia de negocios"
    >
      {page}
    </MainLayout>
  );
};
export default Dashboard;
