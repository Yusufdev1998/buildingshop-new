import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";

const Header: React.FC<{
  collapsed?: boolean;
  setCollapsed?: (bool: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const { onSearch } = useSearch();
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        {setCollapsed && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        )}

        <Input
          className="search-input"
          allowClear
          onChange={onSearch}
          prefix={
            <SearchOutlined
              style={{
                fontSize: 18,
                color: "var(--main-color)",
              }}
            />
          }
          placeholder="Qidiruv..."
        ></Input>
      </div>
      <Button
        onClick={logOut}
        icon={<LogoutOutlined />}
        type="primary"
      ></Button>
    </div>
  );
};

export default Header;
