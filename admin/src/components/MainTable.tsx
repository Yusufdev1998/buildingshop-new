import React from "react";
import { ConfigProvider, Table } from "antd";

const MainTable: React.FC<{
  columns: any;
  data: Array<object>;
  loading: boolean;
  rowDoubleClick?: (record: any) => void;
}> = ({ columns, data, loading, rowDoubleClick }) => {
  const onRow = (record: any) => ({
    onDoubleClick: () => {
      if (rowDoubleClick) {
        return rowDoubleClick(record);
      } else return;
    },
  });

  const rowClassName = () => {
    if (rowDoubleClick) {
      return "clickable-row";
    } else return "";
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "var(--main-color)",
            headerColor: "#fff",
          },
        },
      }}
    >
      <Table
        rowKey={"id"}
        loading={loading}
        bordered
        rowClassName={rowClassName}
        columns={columns}
        dataSource={data}
        onRow={onRow}
      />
    </ConfigProvider>
  );
};

export default MainTable;
