import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import useForm from "../../hooks/useForm";
import axiosFetch from "../../utils/axiosFetch";

const path = "products";
const ProductForm: React.FC<{ initialValues?: any; method: any }> = ({
  initialValues,
  method,
}) => {
  const { loading, addData, updateData } = useForm();
  const [selectsLoading, setSelectsLoading] = useState(false);

  const [selectsData, setSelectsData] = useState({
    brands: [],
    product_types: [],
    product_measures: [],
  });

  const onFinish = (values: any) => {
    if (method === "edit") {
      updateData(values, path, initialValues.id);
    } else {
      addData(values, path);
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
      const [
        { data: brands },
        { data: product_types },
        { data: product_measures },
      ] = await Promise.all([
        axiosFetch({ url: "/brands" }),
        axiosFetch({ url: "/product-types" }),
        axiosFetch({ url: "/product-measures" }),
      ]);
      setSelectsData({
        brands,
        product_measures,
        product_types,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSelectsLoading(false);
    }
  };

  type FieldType = {
    name: string;
    price: number;
    ball: number;
    brend_name: string;
    product_type_name: string;
    product_measure_name: string;
  };
  return (
    <Form
      name="basic"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Nomi"
        name="name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Narxi"
        name="price"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<FieldType>
        label="Ball(100,000)"
        name="ball"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<FieldType>
        label="Бренд танланг"
        name="brend_name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Select
          loading={selectsLoading}
          options={selectsData.brands.map((brand: { name: string }) => ({
            value: brand.name,
            label: brand.name,
          }))}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Махсулот тури танланг"
        name="product_type_name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Select
          loading={selectsLoading}
          options={selectsData.product_types.map((brand: { name: string }) => ({
            value: brand.name,
            label: brand.name,
          }))}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Ўлчов бирлиги танланг"
        name="product_measure_name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Select
          loading={selectsLoading}
          options={selectsData.product_measures.map(
            (brand: { name: string }) => ({
              value: brand.name,
              label: brand.name,
            })
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
