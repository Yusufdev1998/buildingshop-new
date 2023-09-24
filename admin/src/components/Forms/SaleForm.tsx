import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import useForm from "../../hooks/useForm";
import { SalePage } from "../../pages/allPages.tsx";
import axiosFetch from "../../utils/axiosFetch.ts";
import EditableTable from "../EditableTable.tsx";

const path = SalePage.path;
const SaleForm: React.FC<{ initialValues?: any; method: any }> = ({
  initialValues,
  method,
}) => {
  const { loading, addData, updateData } = useForm();
  const [selectsLoading, setSelectsLoading] = useState(false);

  const [selectsData, setSelectsData] = useState({
    branches: [],
    builders: [],
  });

  const onFinish = async (values: any) => {
    if (method === "edit") {
      await updateData(initialValues, path, initialValues.id);
    } else {
      await addData(values, path);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    getSelectsData();
  }, []);

  const getSelectsData = async () => {
    try {
      setSelectsLoading(true);
      const [{ data: branches }, { data: builders }] = await Promise.all([
        axiosFetch({ url: "/branches" }),
        axiosFetch({ url: "/builders" }),
      ]);
      setSelectsData({
        branches,
        builders,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSelectsLoading(false);
    }
  };

  type FieldType = {
    builder_id: number;
    branch_id: number;
    total_summa: number;
    total_ball: number;
    sold_products: any;
  };
  return (
    <Form
      name="basic"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col>
          <Form.Item<FieldType>
            label="Usta танланг"
            name="builder_id"
            rules={[{ required: true, message: "Iltimos nom bering" }]}
          >
            <Select
              loading={selectsLoading}
              options={selectsData.builders.map((builder: any) => ({
                value: builder.id,
                label: builder.first_name + " " + builder.last_name,
              }))}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<FieldType>
            label="Filial танланг"
            name="branch_id"
            rules={[{ required: true, message: "Iltimos nom bering" }]}
          >
            <Select
              loading={selectsLoading}
              options={selectsData.branches.map((branch: any) => ({
                value: branch.id,
                label: branch.name,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <EditableTable
            sold_products={initialValues.sold_products || []}
          ></EditableTable>
        </Col>
      </Row>

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SaleForm;
