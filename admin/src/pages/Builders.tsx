import MainTable from "../components/MainTable";
import PageActions from "../components/PageActions";
import columnActions from "../utils/columnActions";
import { useAppDispatch } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";
import { BUILDER_FORM } from "../components/Forms/allForms";
import useTableData from "../hooks/useTableData";

const config = {
  path: "/builders",
  title: "Усталар",
  drawerComponent: BUILDER_FORM,
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
      dataIndex: "first_name",
      key: "first_name",
      render: (text: any, record: any) =>
        record.first_name + " " + record.last_name,
    },
    {
      title: "Телефон",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Телефон 2",
      dataIndex: "extra_phone",
      key: "extra_phone",
    },
    {
      title: "Вилоят",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Манзил",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Туғулган сана",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Парол",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Расм",
      dataIndex: "img_url",
      key: "img_url",
    },
  ],
};

const columns = [...config.columns, ...columnActions(config)];
const Builders = () => {
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

export default Builders;
