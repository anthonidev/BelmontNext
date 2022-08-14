import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/layouts/MainLayout";
import ModalClientList from "../../components/modal/ModalClientList";
import { get_listClient } from "../../redux/api/campaign";
import { AppDispatch, RootState } from "../../redux/store";

type Props = {};

const ListClient = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(get_listClient());
  }, [dispatch]);
  const { count, next, previous, results } = useSelector(
    (state: RootState) => state.camapaign.list
  );

  return (
    <div>
      <h1>Mi lista</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        {results?.map((item) => (
          <ModalClientList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

ListClient.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="List Clients Page" content="Content Page">
      {page}
    </MainLayout>
  );
};

export default ListClient;
