import {
    ArrowRightOutlined,
    ClockCircleOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { Avatar, Divider, Input, Tag, Typography } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.scss";

const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

const categories = ["All", "Architecture", "Microservices", "C#", "OOP", "Database", "Testing"];

const Blog = () => {
    const [selectedTag, setSelectedTag] = useState("All");

    return (
        <div className={cx("blog-wrapper")}>
            {/* 1. HEADER & SEARCH */}
            <header className={cx("blog-header")}>
                <div className={cx("header-content")}>
                    <div className={cx("title-area")}>
                        <Title level={1} className={cx("main-title")}>Inex Blog</Title>
                        <div className={cx("search-wrap")}>
                            <Input
                                prefix={<SearchOutlined />}
                                placeholder="Tìm kiếm kiến thức..."
                                className={cx("search-input")}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. TAG NAVIGATION (Dạng thanh điều hướng) */}
            <nav className={cx("tag-nav")}>
                <div className={cx("nav-inner")}>
                    {categories.map(tag => (
                        <span
                            key={tag}
                            className={cx("nav-item", { active: selectedTag === tag })}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </nav>

            <main className={cx("blog-content")}>
                {/* 3. FEATURED POST (Tạo điểm nhấn Wow) */}
                <section className={cx("featured-section")}>
                    <article className={cx("featured-card")}>
                        <div className={cx("featured-img")}>
                            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800" alt="featured" />
                        </div>
                        <div className={cx("featured-info")}>
                            <Tag color="blue" className={cx("premium-tag")}>ARCHITECTURE</Tag>
                            <Title level={2}>Xây dựng Microservices chuẩn Enterprise với .NET 8</Title>
                            <Paragraph className={cx("excerpt")}>
                                Hướng dẫn chi tiết cách áp dụng Clean Architecture và Domain Driven Design vào dự án thực tế giúp hệ thống mở rộng không giới hạn...
                            </Paragraph>
                            <div className={cx("meta")}>
                                <Avatar src="https://i.pravatar.cc/100" />
                                <div className={cx("meta-text")}>
                                    <Text strong>cr0issant</Text>
                                    <Text type="secondary">22 Jan, 2026 • 8 min read</Text>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>

                <Divider />

                {/* 4. GRID DANH SÁCH BÀI VIẾT */}
                <section className={cx("articles-grid")}>
                    {[1, 2, 3, 4].map((i) => (
                        <article key={i} className={cx("refined-card")}>
                            {/* 🟢 1. Thẻ Link bao phủ toàn bộ diện tích Card */}
                            <Link to="/blog-detail" className={cx("main-link-overlay")} aria-label="Đọc bài viết" />

                            <div className={cx("card-image")}>
                                <img src={`https://picsum.photos/seed/${i}/600/400`} alt="blog" />
                            </div>

                            <div className={cx("card-body")}>
                                <div className={cx("card-top")}>
                                    <Text className={cx("category-label")}>C# CONCEPTS</Text>
                                    <Text className={cx("read-time")}><ClockCircleOutlined /> 5 min</Text>
                                </div>

                                <Title level={4} className={cx("card-title")}>
                                    OOP trong Python: Hiểu rõ 4 Tứ trụ cốt lõi
                                </Title>

                                <Paragraph className={cx("card-excerpt")} ellipsis={{ rows: 2 }}>
                                    Giải mã Đóng gói, Kế thừa, Đa hình và Trừu tượng qua các ví dụ thực tế cực kỳ dễ hiểu.
                                </Paragraph>

                                <div className={cx("card-footer")}>
                                    {/* Chuyển thành span/div vì thẻ Link overlay ở trên đã đảm nhận việc chuyển trang */}
                                    <div className={cx("read-more-text")}>
                                        Đọc tiếp <ArrowRightOutlined />
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Blog;