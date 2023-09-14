import MainTable from "../components/MainTable";
import PageActions from "../components/PageActions";
import columnActions from "../utils/columnActions";
import { useAppDispatch } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";
import { PRODUCT_TYPE_FORM } from "../components/Forms/allForms";
import useTableData from "../hooks/useTableData";

const config = {
  path: "/product-types",
  title: "Maxsulot turi",
  drawerComponent: PRODUCT_TYPE_FORM,
  columns: [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "Maxsulot turi",
      dataIndex: "name",
      key: "name",
    },
  ],
};

const columns = [...config.columns, ...columnActions(config)];
const ProductType = () => {
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

export default ProductType;
