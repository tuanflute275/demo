import {
    ArrowRightOutlined,
    CodeOutlined, DatabaseOutlined,
    FireFilled,
    GlobalOutlined,
    ReadFilled,
    RocketFilled,
    SearchOutlined,
    ToolFilled
} from "@ant-design/icons";
import { Avatar, Button, Input, Tag, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const { Title, Text, Paragraph } = Typography;

const Home = () => {
  
    return (
        <div>

           {/* header  */}

            {/* 🟢 2. HERO SECTION */}
            <header className={cx("hero-section")}>
                <div className={cx("floating-shape", "shape-1")} />
                <div className={cx("floating-shape", "shape-2")} />

                <div className={cx("hero-content")}>
                    <Tag className={cx("brand-tag")} icon={<FireFilled />}>
                        Nền tảng học tập thế hệ mới
                    </Tag>

                    <Title className={cx("hero-title")}>
                        Nâng tầm sự nghiệp <br />
                        <span className={cx("text-highlight")}>Lập trình viên .NET</span>
                    </Title>

                    <Paragraph className={cx("hero-desc")}>
                        Hệ sinh thái kiến thức toàn diện từ C#, React, Database đến Kỹ năng mềm.
                        Được thiết kế để giúp bạn đi xa hơn trong sự nghiệp.
                    </Paragraph>

                    <div className={cx("search-bar-container")}>
                        <Input
                            prefix={<SearchOutlined className={cx("search-icon")} />}
                            placeholder="Tìm kiếm khóa học..."
                            className={cx("hero-search")}
                            suffix={<Button type="primary" shape="circle" icon={<ArrowRightOutlined />} />}
                        />
                    </div>
                </div>

                <div className={cx("wave-bottom")}>
                    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#f8faff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </header>

            {/* 🟢 3. BENTO GRID */}
            <main className={cx("main-grid-wrapper")}>
                <div className={cx("grid-container")}>
                    <div className={cx("bento-card", "tech-card")}>
                        <div className={cx("card-header")}>
                            <div className={cx("icon-box")}><CodeOutlined /></div>
                            <Title level={3}>Lộ trình Kỹ thuật</Title>
                        </div>
                        <Paragraph type="secondary">Kho tàng kiến thức chuyên sâu về .NET Ecosystem.</Paragraph>
                        <div className={cx("tech-tags")}>
                            {["C# Advanced", "Clean Arch", "ReactJS", "SQL Opt", "Microservices"].map(tag => (
                                <span key={tag} className={cx("pill")}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className={cx("bento-card", "life-card")}>
                        <div className={cx("card-bg-icon")}><RocketFilled /></div>
                        <Title level={3} style={{ color: '#fff' }}>Kỹ năng sống</Title>
                        <Text className={cx("sub-text")}>Quản lý thời gian & Tài chính</Text>
                        <Button ghost className={cx("card-btn")}>Khám phá</Button>
                    </div>

                    <div className={cx("bento-card", "english-card")}>
                        <GlobalOutlined className={cx("big-icon")} />
                        <Title level={4}>English for Devs</Title>
                        <Text type="secondary">Giao tiếp & Đọc tài liệu.</Text>
                        <Avatar.Group maxCount={3} className={cx("avatars")}>
                            <Avatar src="https://i.pravatar.cc/100?u=1" />
                            <Avatar src="https://i.pravatar.cc/100?u=2" />
                        </Avatar.Group>
                    </div>

                    <div className={cx("bento-card", "data-card")}>
                        <DatabaseOutlined className={cx("big-icon")} />
                        <Title level={4}>Data & API</Title>
                        <Text type="secondary">Master SQL & RESTful.</Text>
                    </div>

                    <div className={cx("bento-card", "tools-card")}>
                        <div className={cx("tools-content")}>
                            <div>
                                <Title level={4}><ToolFilled /> Thư viện Tài nguyên</Title>
                                <Text type="secondary">Ebook, Cheat Sheets, Roadmaps PDF miễn phí.</Text>
                            </div>
                            <Button type="primary" shape="round" icon={<ReadFilled />}>Truy cập ngay</Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* 🟢 4. FOOTER SECTION */}
        </div>
    );
};

export default Home;