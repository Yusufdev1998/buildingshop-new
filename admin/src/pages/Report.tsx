import MainTable from "../components/MainTable";
import columnActions from "../utils/columnActions";
import useTableData from "../hooks/useTableData";

const config = {
  path: "/reports",
  columns: [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "Уста",
      dataIndex: "id",
      key: "name",
      render: (text: any, record: any) =>
        record.first_name + " " + record.last_name,
    },
    {
      title: "Телефон рақам",
      dataIndex: "phone_number",
      key: "name",
    },
    {
      title: "Жами балл",
      dataIndex: "ball",
      key: "name",
    },
  ],
};

const columns = config.columns;
const Report = () => {
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

export default Report;
