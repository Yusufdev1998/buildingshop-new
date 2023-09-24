import MainTable from "../components/MainTable";
import PageActions from "../components/PageActions";
import columnActions from "../utils/columnActions";
import { useAppDispatch } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";
import { USER_FORM } from "../components/Forms/allForms";
import useTableData from "../hooks/useTableData";

const config = {
  path: "/user",
  title: "Фойдаланувчилар",
  drawerComponent: USER_FORM,
  columns: [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "Фамилия исми",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Телефон",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Филиал",
      dataIndex: "branch",
      key: "branch",
      render: (text: any) => (text ? text : "Admin"),
    },
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Манзил",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Парол",
      dataIndex: "password",
      key: "password",
    },
  ],
};

const columns = [...config.columns, ...columnActions(config)];
const Users = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      setDrawer({
        open: true,
        method: "add",
        title: `${config.title} qo'shish`,
        component: config.drawerComponent,
      })
    );
  };

  const { tableData, loading } = useTableData(config.path);
  return (
    <>
      <PageActions onAdd={handleAdd}></PageActions>
      <MainTable
        columns={columns}
        data={tableData}
        loading={loading}
      ></MainTable>
    </>
  );
};

export default Users;
