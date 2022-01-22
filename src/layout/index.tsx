import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import "./layout.css";
import { Button, Layout, Menu, Modal } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import NewEpisode from "../components/newEpisode";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = forwardRef<
  unknown,
  PropsWithChildren<JSX.IntrinsicElements["div"]>
>(({ children }, ref) => {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(
    location.pathname == "/episodes"
      ? "3"
      : location.pathname == "/locations"
      ? "2"
      : "1"
  );
  const [collapsed, changeCollapsed] = useState<boolean>(true);
  const [modalVisible, changeModalVisible] = useState<boolean>(false);
  const [scrollPosition, changeScrollPosition] = useState<number>(0);
  const toggle = () => {
    changeCollapsed(!collapsed);
  };

  useEffect(() => {
    setCurrentPath("1");
    document
      .getElementById("contentScroller")
      ?.addEventListener("scroll", handleScroll);
  }, [location]);

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/characters">Personajes</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<EnvironmentOutlined />}>
            <Link to="/locations">Lugares</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <Link to="/episodes">Episodios</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className={`header ${scrollPosition > 50 && "header-dark"}`}
          style={{
            backgroundColor: `rgba(239,242,245,${
              scrollPosition >= 250 ? 1 : scrollPosition * 0.0055
            })`,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          {location.pathname == "/episodes" && (
            <Button
              type="primary"
              onClick={() => changeModalVisible(!modalVisible)}
            >
              <VideoCameraAddOutlined />
              Nuevo episodio
            </Button>
          )}
          <Modal
            title="Nuevo episodio"
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Crear"
            cancelText="Cancelar"
          >
            <NewEpisode />
          </Modal>
        </Header>
        <Content className="content" id="contentScroller">
          {children}
        </Content>
      </Layout>
    </Layout>
  );

  // TODO: Despejar comentario
  //@ts-ignore
  function handleScroll(e) {
    changeScrollPosition(e.target.scrollTop);
  }
  function handleOk() {
    changeModalVisible(false);
  }
  function handleCancel() {
    changeModalVisible(false);
  }
});

export default MainLayout;
