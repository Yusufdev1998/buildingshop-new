import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTotal from "../../utils/getTotal";
import { SaleType } from "../../pages/Sale";

export interface IDrawer {
  open: boolean;
  method?: "edit" | "add";
  component?: string;
  initialValues?: any;
  title: string;
  width?: number;
}

export interface IModal extends IDrawer {
  sale_type?: SaleType;
}

export interface IappState {
  loading: boolean;
  drawer: IDrawer;
  tableData: Array<object>;
  searchData: [];
  modal: IModal;
  cart: any[];
  currentCartItem: number | null;
}

const initialState: IappState = {
  loading: false,
  drawer: {
    open: false,
    title: "",
  },
  modal: {
    open: false,
    title: "",
  },
  tableData: [],
  searchData: [],
  cart: [],
  currentCartItem: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDrawer: (state, action: PayloadAction<IDrawer>) => {
      state.drawer = action.payload;
    },
    setCurrentCartItem: (state, action) => {
      state.currentCartItem = action.payload;
    },
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    removeCart: (state, action) => {
      state.cart = state.cart.filter((c: any) => c.id !== action.payload);
    },
    setCartItemCount: (state, action) => {
      state.cart = state.cart.map((c: any) =>
        c.id === action.payload.id
          ? { ...c, count: c.count + action.payload.count }
          : c
      );
    },
    setModal: (state, action: PayloadAction<IModal>) => {
      state.modal = action.payload;
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

    editSaleTableData: (state, action) => {
      state.drawer.initialValues.sold_products =
        state.drawer.initialValues?.sold_products.map((p: any) =>
          p.id === action.payload.id
            ? { ...p, [action.payload.name]: action.payload.value }
            : p
        );
      const total = getTotal(state.drawer.initialValues?.sold_products || []);
      state.drawer.initialValues.total_summa = total.total_summa;
      state.drawer.initialValues.total_ball = total.total_ball;
    },

    deleteSaleTableData: (state, action) => {
      state.drawer.initialValues.sold_products =
        state.drawer.initialValues?.sold_products.filter(
          (p: any) => p.id !== action.payload
        );
      const total = getTotal(state.drawer.initialValues?.sold_products || []);
      state.drawer.initialValues.total_summa = total.total_summa;
      state.drawer.initialValues.total_ball = total.total_ball;
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
  editSaleTableData,
  deleteSaleTableData,
  setModal,
  setCurrentCartItem,
  addCart,
  removeCart,
  setCartItemCount,
  setCart,
} = appSlice.actions;

export default appSlice.reducer;
