import React from "react";
import { Button, Form, Input } from "antd";
import useForm from "../../hooks/useForm";
import { Branchpage } from "../../pages/allPages.tsx";

const path = Branchpage.path;
const BranchForm: React.FC<{ initialValues?: any; method: any }> = ({
  initialValues,
  method,
}) => {
  const { loading, addData, updateData } = useForm();

  const onFinish = async (values: any) => {
    if (method === "edit") {
      await updateData(values, path, initialValues.id);
    } else {
      await addData(values, path);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    name: string;
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

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BranchForm;
