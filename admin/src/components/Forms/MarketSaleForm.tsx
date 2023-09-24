import { Button, Form, Select, message } from "antd";
import { useEffect, useState } from "react";
import axiosFetch from "../../utils/axiosFetch";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks";
import getTotal from "../../utils/getTotal";
import { setCart, setModal } from "../../redux/features/appSlice";

const MarketSaleForm: React.FC<{ initialValues: any; modal: any }> = ({
  initialValues,
  modal,
}) => {
  const [selectsData, setSelectsData] = useState([]);
  const cart = useAppSelector(state => state.app.cart);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUstalar();
  }, []);
  const getUstalar = async () => {
    try {
      const result = await axiosFetch({
        url: "/market/builders",
      });

      setSelectsData(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  enum SaleType {
    SOLD = "SOLD",
    RETURN = "RETURN",
  }
  const onFinish = async (values: any) => {
    const total = getTotal(cart);
    try {
      const data = {
        builder_id: values.builder_id,
        sold_products: cart,
        sale_type: modal.sale_type,
        ...total,
      };
      const res = await axiosFetch({
        url:
          modal.sale_type === SaleType.SOLD
            ? "/market/sale"
            : modal.sale_type === SaleType.RETURN
            ? "/market/vozvrat"
            : "",
        method: "POST",
        data,
      });
      if (res.status === 201) {
        message.success("Muvaffaqiyatli yakunladi");
        dispatch(
          setModal({
            open: false,
            title: "",
          })
        );
        dispatch(setCart([]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: 50 }}>
      <Form
        name="saleform"
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Устани танланг"
          name="builder_id"
          rules={[{ required: true, message: "Iltimos ustani tanlang!" }]}
        >
          <Select
            placeholder="Устани танланг"
            options={selectsData.map((d: any) => ({
              value: d.id,
              label: d.first_name + " " + d.last_name + " " + d.phone_number,
            }))}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Sotuvni amalga oshirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MarketSaleForm;
