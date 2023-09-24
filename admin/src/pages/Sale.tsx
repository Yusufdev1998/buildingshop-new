import MainTable from "../components/MainTable";
import columnActions from "../utils/columnActions";
import { SALE_FORM } from "../components/Forms/allForms";
import useTableData from "../hooks/useTableData";

export enum SaleType {
  SOLD = "SOLD",
  RETURN = "RETURN",
}
const config = {
  path: "/sales",
  title: "Sotuv",
  drawerComponent: SALE_FORM,
  width: 1000,
  columns: [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "Филиал",
      dataIndex: "branch",
      key: "branch",
      render: (text: any) => (text ? text : "Admin"),
    },
    {
      title: "Vaqti",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: any) => new Date(text).toLocaleString(),
    },
    {
      title: "Жами товар сумма",
      dataIndex: "total_summa",
      key: "total_summa",
    },
    {
      title: "Жами балл",
      dataIndex: "total_ball",
      key: "total_ball",
    },
    {
      title: "Қайси устага",
      dataIndex: "builder",
      key: "builder",
      render: (text: any) => text?.first_name + " " + text?.last_name,
    },
    {
      title: "Холати",
      dataIndex: "sale_type",
      key: "sale_type",
      render: (text: SaleType) => (text === "SOLD" ? "Savdo" : "Vozvrat"),
    },
  ],
};

const columns = [...config.columns, ...columnActions(config)];
const Sale = () => {
  const { tableData, loading } = useTableData(config.path);
  return (
    <>
      <MainTable
        columns={columns}
        data={tableData}
        loading={loading}
      ></MainTable>
    </>
  );
};

export default Sale;
