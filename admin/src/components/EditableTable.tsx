import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import { Col, InputNumber, Row } from "antd";
import MainTable from "./MainTable";
import { useAppDispatch } from "../redux/ReduxHooks";
import {
  deleteSaleTableData,
  editSaleTableData,
} from "../redux/features/appSlice";

const EditableTable: React.FC<{ sold_products: any }> = ({ sold_products }) => {
  const dispatch = useAppDispatch();

  const handleChange = (v: number | null, name: string, id: number) => {
    const payload = {
      id,
      name: name,
      value: v,
    };
    dispatch(editSaleTableData(payload));
  };

  const deleteRecord = (id: number) => {
    dispatch(deleteSaleTableData(id));
  };
  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "order",
      render: (text: any, record: any, i: any) => i + 1,
    },
    {
      title: "Товар номи",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Бренд номи",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Товар тури",
      dataIndex: "product_type_name",
      key: "product_type_name",
    },
    {
      title: "Нархи",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Сони",
      dataIndex: "count",
      key: "count",
      render: (text: number, record: any) => (
        <InputNumber
          onChange={v => handleChange(v, "count", record.id)}
          name="count"
          value={text}
        ></InputNumber>
      ),
    },
    {
      title: "Суммаси",
      dataIndex: "total_summa",
      key: "total_summa",
      render: (text: any, record: any) => record.price * record.count,
    },
    {
      title: "Балл",
      dataIndex: "ball",
      key: "ball",
      render: (text: number, record: any) => (
        <InputNumber
          onChange={v => handleChange(v, "ball", record.id)}
          name="ball"
          value={text}
        ></InputNumber>
      ),
    },
    {
      title: "Жами балл",
      dataIndex: "total_ball",
      key: "total_ball",
      render: (text: any, record: any) =>
        Math.floor((record.price * record.count) / 100_000) * record.ball,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action_del",
      render: (text: number) => (
        <DeleteFilled
          onClick={() => deleteRecord(text)}
          style={{ color: "red", cursor: "pointer", fontSize: 20 }}
        ></DeleteFilled>
      ),
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: 20,
      }}
    >
      <Row>
        <Col span={24}>
          <MainTable
            columns={columns}
            loading={false}
            data={sold_products}
          ></MainTable>
        </Col>
      </Row>
    </div>
  );
};

export default EditableTable;
