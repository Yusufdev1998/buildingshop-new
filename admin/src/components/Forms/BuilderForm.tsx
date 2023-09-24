import React from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import useForm from "../../hooks/useForm";
import regionsData from "../../data/regionsData";
import { MaskedInput } from "antd-mask-input";

const path = "builders";
const BuilderForm: React.FC<{ initialValues?: any; method: any }> = ({
  initialValues,
  method,
}) => {
  const { loading, addData, updateData } = useForm();

  const onFinish = (values: any) => {
    console.log(values);

    if (method === "edit") {
      updateData(values, path, initialValues.id);
    } else {
      addData(values, path);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    first_name: string;
    last_name: string;
    phone_number: string;
    extra_phone?: string;
    region: string;
    address: string;
    date_of_birth: string;
    password: string;
    img_url?: string;
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
        label="Ism"
        name="first_name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Familiya"
        name="last_name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Asosiy telefon"
        name="phone_number"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <MaskedInput mask={"+998(00) 000-00-00"}></MaskedInput>
      </Form.Item>

      <Form.Item<FieldType>
        label="Регион танланг"
        name="region"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Select
          options={regionsData.map(reg => ({
            value: reg,
            label: reg,
          }))}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Manzil"
        name="address"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Tug'ilgan sana"
        name="date_of_birth"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <MaskedInput mask={Date} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Parol"
        name="password"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BuilderForm;
