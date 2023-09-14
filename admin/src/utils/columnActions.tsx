import ColumnDelete from "../components/ColumnDelete";
import ColumnEdit from "../components/ColumnEdit";
export default (config: any) => {
  return [
    {
      title: "Edit",
      width: 60,
      dataIndex: "id",
      key: "edit",
      render: (text: number, record: any) => (
        <ColumnEdit record={record} config={config}></ColumnEdit>
      ),
    },
    {
      title: "Del",
      dataIndex: "id",
      width: 60,
      key: "delete",
      render: (text: number) => (
        <ColumnDelete path={config.path} id={text}></ColumnDelete>
      ),
    },
  ];
};
