import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Divider, message } from "antd";
import { 
  MailOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  GithubOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./login.module.scss";

const cx = classNames.bind(styles);
const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    // Giả lập API call
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng nhập thành công! Chào mừng trở lại.");
    }, 2000);
  };

  return (
    <div className={cx("login-container")}>
      {/* --- PHẦN VISUAL (BÊN TRÁI - WOW FACTOR) --- */}
      <div className={cx("visual-side")}>
        {/* Các hình khối trôi nổi tạo hiệu ứng chiều sâu */}
        <div className={cx("floating-shape", "shape-1")} />
        <div className={cx("floating-shape", "shape-2")} />
        
        <div className={cx("visual-content")}>
          <div className={cx("brand-logo")}>
            <FireOutlined style={{ fontSize: 32, color: '#fff' }} /> {/* Thay bằng logo dự án */}
            <Title level={2} style={{ color: '#fff', margin: 0 }}>Inex Project</Title>
          </div>
          <Title level={1} className={cx("hero-title")}>
            Kiến tạo tương lai số <br /> cùng nền tảng của bạn.
          </Title>
          <Paragraph className={cx("hero-desc")}>
            Truy cập vào hệ thống quản lý chuyên nghiệp, bảo mật và hiệu quả cao.
            Trải nghiệm sự khác biệt ngay hôm nay.
          </Paragraph>
        </div>
        
        {/* Lớp phủ gradient & texture */}
        <div className={cx("overlay-gradient")} />
      </div>

      {/* --- PHẦN FORM (BÊN PHẢI - PROFESSIONAL) --- */}
      <div className={cx("form-side")}>
        <div className={cx("form-wrapper")}>
          <div className={cx("form-header")}>
            <Title level={2} className={cx("welcome-title")}>Chào mừng trở lại!</Title>
            <Text type="secondary">Vui lòng nhập thông tin để tiếp tục.</Text>
          </div>

          <Form
            name="login_form"
            className={cx("login-form")}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input 
                prefix={<MailOutlined className={cx("input-icon")} />} 
                placeholder="Email của bạn" 
                className={cx("custom-input")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className={cx("input-icon")} />}
                type="password"
                placeholder="Mật khẩu"
                className={cx("custom-input")}
              />
            </Form.Item>

            <div className={cx("form-options")}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ tôi</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className={cx("forgot-link")}>
                Quên mật khẩu?
              </Link>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className={cx("submit-btn")}
                loading={loading}
                block
              >
                Đăng nhập ngay <ArrowRightOutlined />
              </Button>
            </Form.Item>

            <Divider plain><Text type="secondary" style={{fontSize: 13}}>Hoặc tiếp tục với</Text></Divider>

            <div className={cx("social-login")}>
              <Button icon={<GoogleOutlined />} className={cx("social-btn")}>Google</Button>
              <Button icon={<GithubOutlined />} className={cx("social-btn")}>GitHub</Button>
            </div>
          </Form>

          <div className={cx("form-footer")}>
            <Text>Chưa có tài khoản? </Text>
            <Link to="/register" className={cx("register-link")}>Đăng ký miễn phí</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import icon tạm thời nếu bạn chưa có
import { FireOutlined } from "@ant-design/icons";

export default Login;