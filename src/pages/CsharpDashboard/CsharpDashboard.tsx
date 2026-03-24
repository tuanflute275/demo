import React from "react";
import { Layout, Typography, Button, Tag, Row, Col } from "antd";
import {
    PlayCircleFilled,
    CheckCircleOutlined,
    CodeOutlined,
    TrophyOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./CsharpDashboard.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const { Header, Content } = Layout;
const { Text } = Typography;

const CsharpDashboard: React.FC = () => {
    return (
        <Layout className={cx("container")}>
            {/* Các khối nền trang trí */}
            <div className={cx("bgShape1")}></div>
            <div className={cx("bgShape2")}></div>

            <Header className={cx("header")}>
                <div className={cx("logoArea")}>
                    {/* Logo C# hoặc biểu tượng liên quan */}
                    <span style={{ fontSize: "32px", marginRight: "8px" }}>🎯</span>{" "}
                    CSharpPro
                </div>
                <div className={cx("navLinks")}>
                    <Link to="/lesson">Lộ trình</Link>
                    <Link to={"/"}>
                        <Button type="primary" shape="round" className={cx("primaryBtn")}>
                            Trang chủ
                        </Button>
                    </Link>
                </div>
            </Header>

            <Content className={cx("heroContent")}>
                <Row gutter={[64, 48]} align="middle">
                    {/* Cột bên trái: Nội dung chữ với animation xuất hiện */}
                    <Col xs={24} lg={12}>
                        <div className={cx("badgeUpdate", "animateFadeInUp")}>
                            🚀 Cập nhật 2025: .NET 9 Ready
                        </div>

                        <h1 className={cx("mainTitle", "animateFadeInUp", "delay1")}>
                            Học C# <span style={{ fontSize: "0.9em" }}>💻</span> <br />
                            <span className={cx("highlight")}>Mạnh mẽ như Rồng 🐉</span>
                        </h1>

                        <div className={cx("description", "animateFadeInUp", "delay2")}>
                            <Text strong>60+ bài học thực chiến</Text> • Từ cơ bản đến nâng
                            cao với .NET • Không lý thuyết suông, chỉ tập trung vào{" "}
                            <strong>kỹ năng xây dựng ứng dụng thực tế</strong>.
                        </div>

                        <div className={cx("buttonGroup", "animateFadeInUp", "delay3")}>
                            <Link to="/lesson">
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<PlayCircleFilled />}
                                    className={cx("primaryBtn", "pulseEffect")}
                                >
                                    Bắt Đầu Học Ngay
                                </Button>
                            </Link>

                            <Link to="/lesson">
                                <Button size="large" className={cx("secondaryBtn")}>
                                    Xem Chương Trình
                                </Button>
                            </Link>
                        </div>

                        <div className={cx("featureTags", "animateFadeInUp", "delay3")}>
                            <Tag
                                className={cx("tagItem")}
                                icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                            >
                                Miễn phí khóa nền tảng
                            </Tag>
                            <Tag
                                className={cx("tagItem")}
                                icon={<CodeOutlined style={{ color: "#1890ff" }} />}
                            >
                                Thực hành trên Web & IDE
                            </Tag>
                            <Tag
                                className={cx("tagItem")}
                                icon={<TrophyOutlined style={{ color: "#faad14" }} />}
                            >
                                Dự án Portfolio
                            </Tag>
                        </div>
                    </Col>

                    {/* Cột bên phải: Code Editor C# */}
                    <Col xs={24} lg={12}>
                        <div className={cx("codeWindow")}>
                            <div className={cx("windowHeader")}>
                                <span className={cx("red")}></span>
                                <span className={cx("yellow")}></span>
                                <span className={cx("green")}></span>
                                {/* Tên file C# */}
                                <span>
                                    <p
                                        style={{
                                            color: "#888",
                                            marginLeft: "10px",
                                            fontSize: "12px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Program.cs
                                    </p>
                                </span>
                            </div>
                            <div className={cx("codeContent")}>
                                <div>
                                    <span className={cx("comment")}>
                    // 🚀 C# & LINQ - Sức mạnh & Ngắn gọn:
                                    </span>
                                </div>
                                <br />
                                <div>
                                    <span className={cx("keyword")}>var</span>{" "}
                                    <span className={cx("variable")}>nums</span> ={" "}
                                    <span className={cx("keyword")}>new</span>[] {`{`}{" "}
                                    <span className={cx("number")}>1, 2, 3, 4, 5</span> {`}`};
                                </div>
                                <br />
                                <div>
                                    <span className={cx("comment")}>
                    // Lọc số chẵn & bình phương
                                    </span>
                                </div>
                                <div>
                                    <span className={cx("keyword")}>var</span>{" "}
                                    <span className={cx("variable")}>results</span> ={" "}
                                    <span className={cx("variable")}>nums</span>
                                </div>
                                <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;.
                                    <span className={cx("linq")}>Where</span>(
                                    <span className={cx("variable")}>n</span> {`=>`}{" "}
                                    <span className={cx("variable")}>n</span> %{" "}
                                    <span className={cx("number")}>2</span> =={" "}
                                    <span className={cx("number")}>0</span>)
                                </div>
                                <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;.
                                    <span className={cx("linq")}>Select</span>(
                                    <span className={cx("variable")}>n</span> {`=>`}{" "}
                                    <span className={cx("variable")}>n</span> *{" "}
                                    <span className={cx("variable")}>n</span>)
                                </div>
                                <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;.
                                    <span className={cx("linq")}>ToList</span>();
                                </div>
                                <br />
                                <div>
                                    <span className={cx("type")}>Console</span>.
                                    <span className={cx("function")}>WriteLine</span>(
                                    <span className={cx("string")}>$"Result: [</span>
                                    {`{string.Join(", ", results)}`}
                                    <span className={cx("string")}>]"</span>);
                                </div>

                                <div className={cx("resultContainer")}>
                                    <span style={{ color: "#888", marginRight: "8px" }}>
                                        &gt;
                                    </span>
                                    {/* Hiệu ứng gõ chữ cho kết quả */}
                                    <p className={cx("typingEffect")}>Result: [4, 16]</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default CsharpDashboard;
