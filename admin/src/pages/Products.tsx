import MainTable from "../components/MainTable";
import PageActions from "../components/PageActions";
import columnActions from "../utils/columnActions";
import { useAppDispatch } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";
import { PRODUCT_FORM } from "../components/Forms/allForms";
import useTableData from "../hooks/useTableData";

const config = {
  path: "/products",
  title: "Maxsulotlar",
  drawerComponent: PRODUCT_FORM,
  columns: [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "Махсулот номи",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Сотув нархи",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ball (100,000)",
      dataIndex: "ball",
      key: "ball",
    },
    {
      title: "Бренд",
      dataIndex: "brend_name",
      key: "brend_name",
    },
    {
      title: "Махсулот тури",
      dataIndex: "product_type_name",
      key: "product_type_name",
    },
    {
      title: "Ўлчов бирлиги",
      dataIndex: "product_measure_name",
      key: "product_measure_name",
    },
  ],
};

const columns = [...config.columns, ...columnActions(config)];
const Products = () => {
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

export default Products;
