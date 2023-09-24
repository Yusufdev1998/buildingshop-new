import CardArea from "../components/CardArea";
import MainTable from "../components/MainTable";
import BasicModal from "../components/BasicModal";
import useTableData from "../hooks/useTableData";
import Header from "../layout/Header";
import { useAppDispatch, useAppSelector } from "../redux/ReduxHooks";
import { addCart } from "../redux/features/appSlice";
import NumberFormat from "../utils/NumberFormat";

const Market = () => {
  const columns = [
    {
      title: <div className="table_head">№</div>,
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
      width: "50px",
      align: "center",
    },
    {
      title: <div className="table_head">Номи / Артикул</div>,
      dataIndex: "name",
      key: "nomi",
    },
    {
      title: <div className="table_head">Сотув нархи</div>,
      dataIndex: "price",
      key: "nomi",
      render: (text: any) => NumberFormat(text) + " сўм",
      align: "center",
    },
    {
      title: <div className="table_head">Бall (100,000)</div>,
      dataIndex: "ball",
      key: "nomi",
    },
    {
      title: <div className="table_head">Бренд</div>,
      dataIndex: "brend_name",
      key: "nomi",
    },
    {
      title: <div className="table_head">Махсулот тури</div>,
      dataIndex: "product_type_name",
      key: "nomi",
    },
    {
      title: <div className="table_head">Ўлчов бирлиги</div>,
      dataIndex: "product_measure_name",
      key: "nomi",
    },
  ];

  const modal = useAppSelector(state => state.app.modal);
  const dispatch = useAppDispatch();

  const { tableData, loading } = useTableData("/market");
  const rowDoubleClick = (record: any) => {
    dispatch(
      addCart({
        ...record,
        count: 1,
      })
    );
  };
  return (
    <div>
      <Header></Header>
      <div className="savdo_area">
        <MainTable
          rowDoubleClick={rowDoubleClick}
          columns={columns}
          loading={loading}
          data={tableData}
        ></MainTable>
        <CardArea></CardArea>
      </div>
      <BasicModal modal={modal}></BasicModal>
    </div>
  );
};

export default Market;
