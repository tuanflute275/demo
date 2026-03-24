import { useState } from "react";
import { Button, Drawer, Collapse } from "antd";
import {
  MenuOutlined, CloseOutlined, DownOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
const { Panel } = Collapse;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cấu trúc dữ liệu có thêm path để điều hướng
  const menuItems = [
    {
      title: "Học tập",
      path: "/learning",
      children: [
        { label: "Lộ trình .NET", link: "/welcome-csharp" },
        { label: "Khóa học React", link: "/react-course" },
        { label: "Database Master", link: "/database" },
        { label: "Architecture", link: "/architecture" }
      ]
    },
    {
      title: "Kỹ năng",
      path: "/skills",
      children: [
        { label: "Quản lý thời gian", link: "/time-management" },
        { label: "Tài chính cá nhân", link: "/finance" },
        { label: "Tiếng Anh IT", link: "/english" }
      ]
    },
    {
      title: "Blog",
      path: "/blog",
      children: [] // Menu đơn
    }
  ];

  return (
    <>
      <nav className={cx("floating-navbar")}>
        <div className={cx("nav-inner")}>
          <Link to="/" className={cx("logo")}>
            INEX<span className={cx("dot")}>.</span>PRO
          </Link>

          {/* Desktop Menu */}
          <div className={cx("desktop-menu")}>
            {menuItems.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={index} className={cx("menu-item-group")}>
                  {hasChildren ? (
                    <>
                      <span className={cx("menu-link")}>
                        {item.title} <DownOutlined className={cx("arrow-icon")} />
                      </span>
                      <div className={cx("dropdown-menu")}>
                        {item.children.map((child, cIndex) => (
                          <Link key={cIndex} to={child.link} className={cx("dropdown-link")}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link to={item.path} className={cx("menu-link")}>
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className={cx("nav-actions")}>
            <Link to="/login">
              <Button type="primary" shape="round" className={cx("login-btn")}>
                Đăng nhập
              </Button>
            </Link>
            <Button
              type="text"
              icon={<MenuOutlined />}
              className={cx("mobile-toggle")}
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <Link
            to="/"
            className={cx("logo", "drawer-logo")}
            onClick={() => setMobileMenuOpen(false)}
          >
            INEX<span className={cx("dot")}>.</span>PRO
          </Link>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className={cx("mobile-drawer")}
        closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
      >
        <div className={cx("mobile-menu-list")}>
          <Collapse ghost expandIconPosition="end">
            {menuItems.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <Panel header={item.title} key={index} className={cx("mobile-panel")}>
                    {item.children.map((child, cIndex) => (
                      <Link
                        key={cIndex}
                        to={child.link}
                        className={cx("mobile-link")}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </Panel>
                );
              }

              return (
                <div key={index} className={cx("mobile-single-link")}>
                  <Link
                    to={item.path}
                    className={cx("menu-link-single")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </Collapse>
        </div>
      </Drawer>
    </>
  );
};

export default Header;