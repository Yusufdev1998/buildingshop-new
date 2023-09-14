import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDrawer {
  open: boolean;
  method?: "edit" | "add";
  component?: string;
  initialValues?: any;
  title: string;
}

export interface IappState {
  loading: boolean;
  drawer: IDrawer;
  tableData: Array<object>;
  searchData: [];
}

const initialState: IappState = {
  loading: false,
  drawer: {
    open: false,
    title: "",
  },
  tableData: [],
  searchData: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDrawer: (state, action: PayloadAction<IDrawer>) => {
      state.drawer = action.payload;
    },
    setTableData: (state, action: PayloadAction<[]>) => {
      state.tableData = action.payload;
    },
    addTableData: (state, action) => {
      state.tableData.push(action.payload as never);
    },

    deleteTableData: (state, action) => {
      (state.tableData as any) = state.tableData.filter(
        (d: any) => d.id !== action.payload
      );
    },
    updateTableData: (state, action) => {
      (state.tableData as any) = state.tableData.map((d: any) =>
        d.id === action.payload.id ? action.payload : d
      );
    },

    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const {
  setDrawer,
  setTableData,
  addTableData,
  deleteTableData,
  updateTableData,
  setSearchData,
} = appSlice.actions;

export default appSlice.reducer;
