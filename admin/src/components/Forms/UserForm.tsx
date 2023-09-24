import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import useForm from "../../hooks/useForm";
import regionsData from "../../data/regionsData";
import { MaskedInput } from "antd-mask-input";
import axiosFetch from "../../utils/axiosFetch";

const path = "user/signup";
const UserForm: React.FC<{ initialValues?: any; method: any }> = ({
  initialValues,
  method,
}) => {
  const { loading, addData, updateData } = useForm();
  const [selectLoading, setSelectLoading] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);

  const onFinish = (values: any) => {
    if (method === "edit") {
      updateData(values, path, initialValues.id);
    } else {
      addData(values, path);
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    try {
      setSelectLoading(true);
      const result = await axiosFetch({
        url: "/branches",
      });
      const data = [
        { value: "", label: "Admin" },
        ...result.data.map((d: any) => ({ value: d.name, label: d.name })),
      ];
      setBranches(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    name: string;
    branch?: string;
    login: string;
    password: string;
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
        label="Familiya ism"
        name="name"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType> label="Филиал танланг" name="branch">
        <Select loading={selectLoading} options={branches} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Login"
        name="login"
        rules={[{ required: true, message: "Iltimos nom bering" }]}
      >
        <Input />
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

export default UserForm;
