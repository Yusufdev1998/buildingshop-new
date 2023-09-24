import { Modal } from "antd";
import { RiCloseCircleFill } from "react-icons/ri";
import { MARKET_SALE_FORM } from "./Forms/allForms";
import MarketSaleForm from "./Forms/MarketSaleForm";
import { useAppDispatch } from "../redux/ReduxHooks";
import { setModal } from "../redux/features/appSlice";

function BasicModal({ modal }: { modal: any }) {
  const dispatch = useAppDispatch();
  const clearModal = () => {
    dispatch(
      setModal({
        open: false,
        title: "",
      })
    );
  };
  let component = null;

  switch (modal.component) {
    case MARKET_SALE_FORM:
      component = (
        <MarketSaleForm modal={modal} initialValues={{}}></MarketSaleForm>
      );
      break;

    default:
      break;
  }
  return (
    <Modal
      centered
      title={modal.title}
      onCancel={clearModal}
      open={modal.open}
      footer={null}
      closeIcon={
        <RiCloseCircleFill
          style={{
            fontSize: "25px",
            color: "#FF4B4B",
            verticalAlign: "middle",
          }}
        ></RiCloseCircleFill>
      }
    >
      {component}
    </Modal>
  );
}

export default BasicModal;
