import React from "react";
import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";
import {
  BRAND_FORM,
  PRODUCT_MEASURE_FORM,
  PRODUCT_TYPE_FORM,
} from "./Forms/allForms";
import BrandForm from "./Forms/BrandForm";
import ProductTypeForm from "./Forms/ProductTypeForm";
import ProductMeasureForm from "./Forms/ProductMeasureForm";

const BasicDrawer: React.FC = () => {
  const drawer = useAppSelector(state => state.app.drawer);
  const dispatch = useAppDispatch();

  let formComponent;
  switch (drawer.component) {
    case BRAND_FORM:
      formComponent = (
        <BrandForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></BrandForm>
      );
      break;
    case PRODUCT_TYPE_FORM:
      formComponent = (
        <ProductTypeForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></ProductTypeForm>
      );
      break;
    case PRODUCT_MEASURE_FORM:
      formComponent = (
        <ProductMeasureForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></ProductMeasureForm>
      );
      break;
    default:
      formComponent = null;
      break;
  }
  return (
    <>
      <Drawer
        onClose={() =>
          dispatch(
            setDrawer({
              open: false,
              title: "",
              component: "",
            })
          )
        }
        title={drawer.title}
        placement="right"
        open={drawer.open}
      >
        {formComponent}
      </Drawer>
    </>
  );
};

export default BasicDrawer;
