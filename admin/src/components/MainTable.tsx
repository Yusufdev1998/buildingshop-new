import React from "react";
import { ConfigProvider, Table } from "antd";

const MainTable: React.FC<{
  columns: any;
  data: Array<object>;
  loading: boolean;
}> = ({ columns, data, loading }) => (
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
      columns={columns}
      dataSource={data}
    />
  </ConfigProvider>
);

export default MainTable;
