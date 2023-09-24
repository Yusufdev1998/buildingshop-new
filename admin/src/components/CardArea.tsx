import { Button } from "antd";

import {
  RiAddCircleFill,
  RiArrowLeftFill,
  RiArrowRightFill,
  RiDeleteBin5Fill,
  RiIndeterminateCircleFill,
} from "react-icons/ri";

import "./Card.css";
import { useAppDispatch, useAppSelector } from "../redux/ReduxHooks";
import {
  removeCart,
  setCartItemCount,
  setCurrentCartItem,
  setModal,
} from "../redux/features/appSlice";
import { useMemo } from "react";
import getTotal from "../utils/getTotal";
import { MARKET_SALE_FORM } from "./Forms/allForms";
import { SaleType } from "../pages/Sale";
function numberFormat(x: any) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else return x;
}
const CardArea = () => {
  const data = useAppSelector(state => state.app.cart);
  const currentCartItem = useAppSelector(state => state.app.currentCartItem);
  const dispatch = useAppDispatch();

  const handleAction = (x: any) => {
    if (currentCartItem) {
      switch (x) {
        case "0":
          dispatch(removeCart(currentCartItem));
          break;
        case "-":
          dispatch(
            setCartItemCount({
              id: currentCartItem,
              count: -1,
            })
          );
          break;
        case "+":
          dispatch(
            setCartItemCount({
              id: currentCartItem,
              count: 1,
            })
          );
          break;
        default:
          break;
      }
    }
  };

  const handleSotish = () => {
    dispatch(
      setModal({
        open: true,
        sale_type: SaleType.SOLD,
        title: "Maxsulotlarni ustaga sotish",
        component: MARKET_SALE_FORM,
      })
    );
  };

  const vozvrat = () => {
    dispatch(
      setModal({
        open: true,
        sale_type: SaleType.RETURN,
        title: "Maxsulotlarni ustaga sotish",
        component: MARKET_SALE_FORM,
      })
    );
  };

  const total = useMemo(() => {
    return getTotal(data);
  }, [data]);
  return (
    <div className="card_area">
      <div className="card_header">
        <h3>Танланган маҳсулотлар</h3>
      </div>
      <div className="card_body">
        <div className="card_item">
          <div style={{ color: "#828282" }}>Номи</div>
          <div style={{ color: "#828282" }}>Нархи</div>
        </div>

        {data.map((d: any) => (
          <div
            key={d.id}
            className={
              d.id === currentCartItem ? "card_item_active" : "card_item"
            }
            onClick={() => {
              dispatch(setCurrentCartItem(d.id));
            }}
          >
            <h4 style={{ color: "#0044C5" }}>{d.name}</h4>
            <div>
              <h5>
                {d.count} х {numberFormat(d.count * d.price)}
              </h5>
            </div>
          </div>
        ))}
      </div>
      <div className="card_footer">
        <div className="card_info">
          <div className="card_item">
            <div>
              <h4 style={{ color: "#4F4F4F", fontWeight: "500" }}>
                Жами сумма:
              </h4>
            </div>
            <div>
              <h3 style={{ color: "#0044C5", fontWeight: "500" }}>
                {numberFormat(total.total_summa)} сўм
              </h3>
            </div>
          </div>
          <div className="card_item">
            <div>
              <h4 style={{ color: "#4F4F4F", fontWeight: "500" }}>Балл:</h4>
            </div>
            <div>
              <h5 style={{ color: "#0044C5", fontWeight: "500" }}>
                {numberFormat(total.total_ball)}
              </h5>
            </div>
          </div>
        </div>
        <div className="card_actions">
          <Button onClick={() => handleAction("0")} type="primary">
            <RiDeleteBin5Fill></RiDeleteBin5Fill>
          </Button>
          <Button onClick={() => handleAction("-")} type="primary">
            <RiIndeterminateCircleFill></RiIndeterminateCircleFill>
          </Button>
          <Button onClick={() => handleAction("+")} type="primary">
            <RiAddCircleFill></RiAddCircleFill>
          </Button>
        </div>
        <div className="card_submit">
          <Button type="primary" onClick={vozvrat} danger>
            <div>
              <RiArrowLeftFill></RiArrowLeftFill>
            </div>{" "}
            &nbsp; <div>Қайтариш</div>
          </Button>
          <Button onClick={handleSotish} type="primary">
            <div>Cотиш</div> &nbsp;{" "}
            <div>
              <RiArrowRightFill></RiArrowRightFill>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardArea;
