import { useAppDispatch } from "./../redux/ReduxHooks";
import Fuse from "fuse.js";
import { ChangeEvent } from "react";
import { useAppSelector } from "../redux/ReduxHooks";
import { setSearchData } from "../redux/features/appSlice";

export default () => {
  const tableData = useAppSelector(state => state.app.tableData);
  const dispatch = useAppDispatch();
  const keys = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const fuseOptions = {
    includeMatches: true,
    keys: keys.filter(k => k !== "id"),
  };
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const fuse = new Fuse(tableData, fuseOptions);
    const searched = fuse.search(e.target.value);
    dispatch(setSearchData(searched.map(d => d.item)));
  };

  return {
    onSearch,
  };
};
