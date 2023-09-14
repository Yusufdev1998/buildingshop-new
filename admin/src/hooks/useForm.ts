import { useAppDispatch } from "./../redux/ReduxHooks";
import { useState } from "react";
import axiosFetch from "../utils/axiosFetch";
import {
  addTableData,
  setDrawer,
  updateTableData,
} from "../redux/features/appSlice";

export default () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const addData = async (values: object, path: string) => {
    try {
      setLoading(true);
      const response = await axiosFetch({
        url: path,
        method: "post",
        data: values,
      });
      if (response.status === 201) {
        dispatch(addTableData(response.data));
        dispatch(
          setDrawer({
            open: false,
            title: "",
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (values: any, path: string, id: number) => {
    try {
      setLoading(true);
      const response = await axiosFetch({
        url: `${path}/${id}`,
        method: "patch",
        data: values,
      });
      if (response.status === 200) {
        dispatch(updateTableData(response.data));
        dispatch(
          setDrawer({
            open: false,
            title: "",
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    addData,
    updateData,
    loading,
  };
};
