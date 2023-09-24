import React, { useEffect, useMemo, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  ConfigProvider,
  Input,
  Row,
  Col,
} from "antd";
import allPages from "../pages/allPages";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BasicDrawer from "../components/BasicDrawer";

import Header from "./Header";
const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["/"]);

  const navigate = useNavigate();

  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const menuItems = useMemo(() => {
    return allPages.map(page => ({
      label: page.title,
      key: page.path,
      icon: page.icon,
    }));
  }, []);

  return (
    <Layout className="main-layout">
      <Sider
        className="sidebar"
        theme="light"
        width={275}
        collapsible
        breakpoint="lg"
        onBreakpoint={broken => {
          setCollapsed(broken);
        }}
        collapsed={collapsed}
        trigger={null}
      >
        <div className="logo">
          <img
            src="https://buildingshop.uz/static/media/brand.d5982c34.svg"
            alt=""
          />
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "#fff",
                itemHoverColor: "#fff",
                fontSize: 20,
                iconMarginInlineEnd: 20,
                itemHeight: 55,
              },
            },
          }}
        >
          <Menu
            className="sidebar-menu"
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={handleMenuItemClick}
            items={menuItems}
          />
        </ConfigProvider>
      </Sider>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
          <BasicDrawer></BasicDrawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
