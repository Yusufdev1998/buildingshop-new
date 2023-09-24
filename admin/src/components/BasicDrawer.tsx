import React from "react";
import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/ReduxHooks";
import { setDrawer } from "../redux/features/appSlice";
import {
  BRANCH_FORM,
  BRAND_FORM,
  BUILDER_FORM,
  PRODUCT_FORM,
  PRODUCT_MEASURE_FORM,
  PRODUCT_TYPE_FORM,
  SALE_FORM,
  USER_FORM,
} from "./Forms/allForms";
import BrandForm from "./Forms/BrandForm";
import ProductTypeForm from "./Forms/ProductTypeForm";
import ProductMeasureForm from "./Forms/ProductMeasureForm";
import ProductForm from "./Forms/ProductForm";
import BuilderForm from "./Forms/BuilderForm";
import BranchForm from "./Forms/BranchForm";
import UseForm from "../hooks/useForm";
import UserForm from "./Forms/UserForm";
import SaleForm from "./Forms/SaleForm";

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
    case PRODUCT_FORM:
      formComponent = (
        <ProductForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></ProductForm>
      );
      break;
    case BUILDER_FORM:
      formComponent = (
        <BuilderForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></BuilderForm>
      );
      break;
    case BRANCH_FORM:
      formComponent = (
        <BranchForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></BranchForm>
      );
      break;
    case USER_FORM:
      formComponent = (
        <UserForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></UserForm>
      );
      break;
    case SALE_FORM:
      formComponent = (
        <SaleForm
          initialValues={drawer.initialValues}
          method={drawer.method}
        ></SaleForm>
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
        width={drawer.width}
      >
        {formComponent}
      </Drawer>
    </>
  );
};

export default BasicDrawer;
