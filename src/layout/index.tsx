import React, { forwardRef, PropsWithChildren, useState } from "react";
import "./layout.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import logo from "./logo.svg";

const { Header, Sider, Content } = Layout;

const MainLayout = forwardRef<
  unknown,
  PropsWithChildren<JSX.IntrinsicElements["div"]>
>(({ children }) => {
  const [collapsed, changeCollapsed] = useState<boolean>(true);
  const toggle = () => {
    changeCollapsed(!collapsed);
  };

  return (
    <Layout className="all">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            src={
              "https://vertebrasoluciones.com/wp-content/uploads/2020/10/Simbolo-vertebra.svg"
            }
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Personajes
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            Lugares
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            Episodios
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
});

export default MainLayout;
