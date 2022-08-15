import { Alert } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { offAlert } from "../../redux/slices/alertSlice";
import { AlertType } from "../../utils/types/interfaces";

const AlertManage = () => {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch: AppDispatch = useDispatch();
  const [color, setColor] = React.useState<AlertType>();

  useEffect(() => {
    if (alert.type) {
      setColor(alert.type);
    }
  }, [alert.type]);

  const HideAlert = () => {
    dispatch(offAlert());
  };
  const displayAlert = () => {
    if (alert.msg !== null) {
      return (
        <Alert
          color={color}
          rounded={false}
          withBorderAccent={true}
          onDismiss={HideAlert}
          //   icon={XIcon}
        >
          <h3 className="text-lg font-medium ">{alert.msg}</h3>
        </Alert>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };
  useEffect(() => {}, [alert]);

  return (
    <React.Fragment>
      <div className="absolute top-4">{displayAlert()}</div>
    </React.Fragment>
  );
};

export default AlertManage;
