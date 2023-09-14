import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";
import axiosFetch from "../utils/axiosFetch";
import { useAppDispatch } from "../redux/ReduxHooks";
import { deleteTableData } from "../redux/features/appSlice";
import { useState } from "react";

const ColumnDelete: React.FC<{ id: number; path: string }> = ({ id, path }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axiosFetch({
        url: `${path}/${id}`,
        method: "delete",
      });

      if (res.status === 200) {
        dispatch(deleteTableData(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Popconfirm
      title="Delete the task"
      open={open}
      description="Are you sure to delete this task?"
      onConfirm={handleDelete}
      onCancel={() => setOpen(false)}
      okText="Yes"
      cancelText="No"
      okButtonProps={{ loading }}
    >
      <DeleteFilled
        onClick={() => setOpen(true)}
        style={{
          fontSize: 20,
          color: "#FF4D4F",
          cursor: "pointer",
        }}
      ></DeleteFilled>
    </Popconfirm>
  );
};

export default ColumnDelete;
