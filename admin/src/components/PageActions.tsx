import { PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";

const PageActions: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  return (
    <div className="page-actions">
      <Button
        size="large"
        onClick={onAdd}
        icon={<PlusCircleFilled></PlusCircleFilled>}
        type="primary"
      >
        Қўшиш
      </Button>
    </div>
  );
};

export default PageActions;
