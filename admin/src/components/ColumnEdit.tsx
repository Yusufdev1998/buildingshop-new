import { EditFilled } from "@ant-design/icons";
import { useAppDispatch } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";

const ColumnEdit: React.FC<{ record: any; config: any }> = ({
  record,
  config,
}) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(
      setDrawer({
        open: true,
        title: `${config.title}ni o'zgartirish`,
        initialValues: record,
        method: "edit",
        component: config.drawerComponent,
        width: config.width || 320,
      })
    );
  };
  return (
    <EditFilled
      style={{
        fontSize: 20,
        color: "coral",
        cursor: "pointer",
      }}
      onClick={handleEdit}
    ></EditFilled>
  );
};

export default ColumnEdit;
