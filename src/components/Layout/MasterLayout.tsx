import React from "react";
import classNames from "classnames/bind";
import styles from "./MasterLayout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const cx = classNames.bind(styles);

interface MasterLayoutProps {
  children: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  return (
    <div className={cx("app-container")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MasterLayout;