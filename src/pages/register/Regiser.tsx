import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Divider, message, Row, Col } from "antd";
import { 
  MailOutlined, 
  LockOutlined, 
  UserOutlined, // Thêm icon User
  GoogleOutlined, 
  GithubOutlined,
  ArrowRightOutlined,
  FireOutlined 
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);
const { Title, Text, Paragraph } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Register values: ", values);
    // Giả lập API call
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng ký tài khoản thành công! Chào mừng bạn.");
    }, 2000);
  };

  return (
    <div className={cx("login-container")}> {/* Giữ nguyên class container để ăn CSS cũ */}
      {/* --- PHẦN VISUAL (BÊN TRÁI) --- */}
      <div className={cx("visual-side")}>
        <div className={cx("floating-shape", "shape-1")} />
        <div className={cx("floating-shape", "shape-2")} />
        
        <div className={cx("visual-content")}>
          <div className={cx("brand-logo")}>
            <FireOutlined style={{ fontSize: 32, color: '#fff' }} />
            <Title level={2} style={{ color: '#fff', margin: 0 }}>Inex Project</Title>
          </div>
          <Title level={1} className={cx("hero-title")}>
            Bắt đầu hành trình <br /> sáng tạo của bạn.
          </Title>
          <Paragraph className={cx("hero-desc")}>
            Tham gia hệ thống để trải nghiệm các tính năng quản lý chuyên nghiệp và bảo mật nhất.
          </Paragraph>
        </div>
        
        <div className={cx("overlay-gradient")} />
      </div>

      {/* --- PHẦN FORM (BÊN PHẢI) --- */}
      <div className={cx("form-side")}>
        <div className={cx("form-wrapper")}>
          <div className={cx("form-header")}>
            <Title level={2} className={cx("welcome-title")}>Tạo tài khoản mới</Title>
            <Text type="secondary">Chỉ mất chưa đầy một phút để bắt đầu.</Text>
          </div>

          <Form
            name="register_form"
            className={cx("login-form")}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            {/* Trường Họ và Tên */}
            <Form.Item
              name="fullname"
              rules={[{ required: true, message: "Vui lòng nhập Họ và Tên!" }]}
            >
              <Input 
                prefix={<UserOutlined className={cx("input-icon")} />} 
                placeholder="Họ và tên của bạn" 
                className={cx("custom-input")}
              />
            </Form.Item>

            {/* Trường Email */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input 
                prefix={<MailOutlined className={cx("input-icon")} />} 
                placeholder="Email đăng ký" 
                className={cx("custom-input")}
              />
            </Form.Item>

            {/* Password & Confirm Password nằm trên cùng 1 hàng hoặc rớt dòng tùy CSS Row/Col */}
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className={cx("input-icon")} />}
                    placeholder="Mật khẩu"
                    className={cx("custom-input")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className={cx("input-icon")} />}
                    placeholder="Xác nhận lại"
                    className={cx("custom-input")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className={cx("form-options")}>
              <Form.Item 
                name="agreement" 
                valuePropName="checked" 
                rules={[
                  { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý điều khoản!')) }
                ]}
                noStyle
              >
                <Checkbox>Tôi đồng ý với điều khoản</Checkbox>
              </Form.Item>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className={cx("submit-btn")}
                loading={loading}
                block
              >
                Đăng ký ngay <ArrowRightOutlined />
              </Button>
            </Form.Item>

            <Divider plain><Text type="secondary" style={{fontSize: 13}}>Hoặc đăng ký với</Text></Divider>

            <div className={cx("social-login")}>
              <Button icon={<GoogleOutlined />} className={cx("social-btn")}>Google</Button>
              <Button icon={<GithubOutlined />} className={cx("social-btn")}>GitHub</Button>
            </div>
          </Form>

          <div className={cx("form-footer")}>
            <Text>Đã có tài khoản? </Text>
            <Link to="/login" className={cx("register-link")}>Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;