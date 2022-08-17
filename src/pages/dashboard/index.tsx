import React, { ReactElement } from "react";
import DashboradLayout from "../../components/layouts/DashboardLayout";

const Dashboard = () => {
  return <div>dashborad</div>;
};
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboradLayout
      title="Dashboard | Belnmont"
      content="Tablero de mando para la inteligencia de negocios"
    >
      {page}
    </DashboradLayout>
  );
};
export default Dashboard;
