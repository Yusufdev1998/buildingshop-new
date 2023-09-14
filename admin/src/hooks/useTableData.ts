import { setTableData } from "../redux/features/appSlice";
import axiosFetch from "../utils/axiosFetch";
import { useAppDispatch, useAppSelector } from "./../redux/ReduxHooks";
import { useEffect, useMemo, useState } from "react";

export default (path: string) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.app.tableData);
  const searchData = useAppSelector(state => state.app.searchData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchTableData(path);
  }, []);

  let tableData = useMemo(() => {
    if (searchData.length > 0) {
      return searchData;
    } else return data;
  }, [searchData, data]);

  const fetchTableData = async (path: string) => {
    try {
      setLoading(true);
      const response = await axiosFetch({
        method: "get",
        url: path,
      });
      dispatch(setTableData(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tableData,
    loading,
  };
};
