import React, { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import classNames from "classnames/bind";
import styles from "./LessonLayout.module.scss";

const cx = classNames.bind(styles);
const { Content, Sider } = Layout;

interface LessonLayoutProps {
  children: React.ReactNode;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // Xử lý Responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) setOpenDrawer(false);
    };
    // Chạy ngay lần đầu mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chiều rộng sidebar khi mở/đóng
  const siderWidth = collapsed ? 80 : 320;

  return (
    <Layout className={cx("master-layout")}>
      {/* 1. Sidebar cho Desktop (FIXED POSITION) */}
      {!isMobile && (
        <Sider
          width={320}
          collapsedWidth={80}
          collapsed={collapsed}
          trigger={null}
          className={cx("desktop-sider")}
        >
          <Sidebar collapsed={collapsed} />
        </Sider>
      )}

      {/* 2. Sidebar cho Mobile (DRAWER) */}
      <Drawer
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={300}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ display: "none" }}
      >
        <Sidebar isMobile onClose={() => setOpenDrawer(false)} />
      </Drawer>

      {/* 3. Main Wrapper (Chứa Header + Content) */}
      <Layout
        className={cx("main-wrapper")}
        style={{ 
          // Đẩy lề trái bằng đúng chiều rộng Sidebar để không bị che
          marginLeft: isMobile ? 0 : siderWidth,
          transition: "margin-left 0.3s cubic-bezier(0.2, 0, 0, 1)"
        }}
      >
        <Header 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          isMobile={isMobile}
          onMenuClick={() => setOpenDrawer(true)}
        />
        
        <Content className={cx("content-area")}>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LessonLayout;