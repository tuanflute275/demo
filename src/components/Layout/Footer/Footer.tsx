import { Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);
const { Text } = Typography;

const Footer = () => (
  <footer className={cx("footer")}>
    <div className={cx("footer-content")}>
      <div className={cx("brand")}>INEX PROJECT</div>
      <div className={cx("links")}>
        <a href="#">Lộ trình</a>
        <a href="#">Về chúng tôi</a>
        <a href="#">Liên hệ</a>
      </div>
      <Text className={cx("copyright")}>© 2026 Built with .NET & Passion.</Text>
    </div>
  </footer>
);

export default Footer;