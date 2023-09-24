import {
  ApartmentOutlined,
  BarChartOutlined,
  DropboxOutlined,
  FormatPainterOutlined,
  HighlightOutlined,
  PercentageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import BrandPage from "./BrandPage";
import ProductType from "./ProductType";
import ProductMeasure from "./ProductMeasure";
import Products from "./Products";
import Builders from "./Builders";
import Branch from "./Branch";
import Users from "./Users";
import Sale from "./Sale";
import Report from "./Report";

export const ProductMeasurePage = {
  title: "Махсулот ўлчови",
  icon: <PercentageOutlined />,
  path: "/product-measures",
  element: <ProductMeasure></ProductMeasure>,
};

export const ProductsPage = {
  title: "Махсулотлар",
  icon: <DropboxOutlined />,
  path: "/products",
  element: <Products></Products>,
};
export const BuildersPage = {
  title: "Усталар",
  icon: <FormatPainterOutlined />,
  path: "/builders",
  element: <Builders></Builders>,
};
export const Branchpage = {
  title: "Филиаллар",
  icon: <ApartmentOutlined />,
  path: "/branches",
  element: <Branch></Branch>,
};

export const UserPage = {
  title: "Фойдаланувчи",
  icon: <UserOutlined />,
  path: "/users",
  element: <Users></Users>,
};
export const SalePage = {
  title: "Sotuv",
  icon: <ShoppingCartOutlined />,
  path: "/sales",
  element: <Sale></Sale>,
};
export const ReportPage = {
  title: "Xisobot",
  icon: <BarChartOutlined />,
  path: "/reports",
  element: <Report></Report>,
};

export default [
  {
    title: "Бренд",
    icon: <YuqueOutlined />,
    path: "/",
    element: <BrandPage></BrandPage>,
  },
  {
    title: "Махсулот тури",
    icon: <HighlightOutlined />,
    path: "/product-types",
    element: <ProductType></ProductType>,
  },
  ProductMeasurePage,
  ProductsPage,
  BuildersPage,
  Branchpage,
  UserPage,
  SalePage,
  ReportPage,
];
