import {
  HighlightOutlined,
  PercentageOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import BrandPage from "./BrandPage";
import ProductType from "./ProductType";
import ProductMeasure from "./ProductMeasure";

export const ProductMeasurePage = {
  title: "Махсулот ўлчови",
  icon: <PercentageOutlined />,
  path: "/product-measures",
  element: <ProductMeasure></ProductMeasure>,
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
];
