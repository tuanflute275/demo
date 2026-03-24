import { Typography, Tag, Avatar, Space, Divider, Row, Col, Button, Breadcrumb, Affix } from "antd";
import { 
  CalendarOutlined, ClockCircleOutlined, ShareAltOutlined, LeftOutlined,
  LinkedinFilled, TwitterCircleFilled, LinkOutlined,
  FireOutlined, InfoCircleFilled
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BlogDetail.module.scss";

const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

const BlogDetail = () => {
  return (
    <div className={cx("blog-detail-page")}>
      {/* --- 1. NAVIGATION BAR --- */}
      <nav className={cx("top-nav")}>
        <div className={cx("container", "nav-content")}>
          <Link to="/blog" className={cx("back-link")}>
            <LeftOutlined /> <span>Quay lại</span>
          </Link>
          <Space className={cx("actions")}>
            <Button type="text" icon={<ShareAltOutlined />}>Chia sẻ</Button>
            <Button type="primary" shape="round" icon={<FireOutlined />}>Subscribe</Button>
          </Space>
        </div>
      </nav>

      <main className={cx("main-container")}>
        <Row gutter={[64, 0]}>
          {/* --- CỘT TRÁI: NỘI DUNG BÀI VIẾT --- */}
          <Col xs={24} lg={17} order={1} className={cx("article-col")}>
            <article className={cx("article-wrapper")}>
              {/* HEADER BÀI VIẾT */}
              <header className={cx("article-header")}>
                <Breadcrumb className={cx("breadcrumb")} separator=">">
                  <Breadcrumb.Item>Blog</Breadcrumb.Item>
                  <Breadcrumb.Item>Architecture</Breadcrumb.Item>
                  <Breadcrumb.Item>Microservices</Breadcrumb.Item>
                </Breadcrumb>
                
                <Title level={1} className={cx("main-title")}>
                  Xây dựng Microservices chuẩn Enterprise: Chiến lược & Thực thi với .NET 8
                </Title>

                <div className={cx("author-meta-block")}>
                  <Avatar src="/avatar.png" size={56} className={cx("author-avatar")} />
                  <div className={cx("meta-info")}>
                    <Text strong className={cx("author-name")}>cr0issant (Minh Quang)</Text>
                    <div className={cx("meta-details")}>
                      <Text>Senior Solutions Architect</Text>
                      <Divider type="vertical" />
                      <Text><CalendarOutlined /> 22 Tháng 1, 2026</Text>
                      <Divider type="vertical" />
                      <Text><ClockCircleOutlined /> 15 phút đọc</Text>
                    </div>
                  </div>
                </div>
              </header>

              {/* ẢNH FEATURED LỚN */}
              <figure className={cx("featured-figure")}>
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop" alt="Microservices Architecture" />
                <figcaption>Hệ thống phân tán quy mô lớn đòi hỏi kiến trúc linh hoạt.</figcaption>
              </figure>

              {/* NỘI DUNG RICH TEXT (Typography là trọng tâm) */}
              <div className={cx("rich-content")}>
                <Paragraph className={cx("lead-paragraph")}>
                  Khi hệ thống Monolith ngày càng trở nên khổng lồ, việc triển khai và bảo trì trở thành một bài toán nan giải. Bài viết này đi sâu vào việc tái cấu trúc sang Microservices, sử dụng sức mạnh của .NET 8 và Containerization.
                </Paragraph>
                
                <Title level={2} id="sec-1">1. Tại sao Monolith lại thất bại ở quy mô lớn?</Title>
                <Paragraph>
                  Trong giai đoạn đầu của startup, Monolith là lựa chọn tuyệt vời: dễ phát triển, dễ debug, và dễ triển khai. Tuy nhiên, khi đội ngũ kỹ thuật vượt quá 50 người, "địa ngục phụ thuộc" (dependency hell) bắt đầu xuất hiện.
                </Paragraph>

                {/* CALLOUT BOX - Điểm nhấn chuyên nghiệp */}
                <div className={cx("callout-box", "info")}>
                  <div className={cx("icon")}><InfoCircleFilled /></div>
                  <div className={cx("content")}>
                    <Text strong>Ghi chú quan trọng:</Text>
                    <Paragraph style={{ margin: 0 }}>
                      Đừng chuyển sang Microservices chỉ vì nó "thời thượng". Hãy chuyển đổi khi nỗi đau của Monolith lớn hơn chi phí quản lý hệ thống phân tán.
                    </Paragraph>
                  </div>
                </div>

                <Title level={2} id="sec-2">2. Thiết kế Domain-Driven (DDD) là nền tảng</Title>
                <Paragraph>
                  Sai lầm lớn nhất khi làm Microservices là chia tách dựa trên kỹ thuật (ví dụ: service database, service authen) thay vì nghiệp vụ (Bounded Contexts).
                </Paragraph>

                {/* GIẢ LẬP CODE BLOCK */}
                <div className={cx("code-block-mock")}>
                  <div className={cx("code-header")}>
                    <span>OrderService/Domain/Aggregates/Order.cs</span>
                    <Tag color="blue">C#</Tag>
                  </div>
                  <pre>
                    <code>
{`public class Order : AggregateRoot
{
    public OrderId Id { get; private set; }
    private List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    // Business logic should be here, not in services
    public void AddItem(Product product, int quantity) {
        // ... validation logic
    }
}`}
                    </code>
                  </pre>
                </div>

                <blockquote>
                  "Microservices không phải là về việc viết code nhỏ hơn, mà là về việc tạo ra các ranh giới nghiệp vụ (business boundaries) rõ ràng hơn."
                </blockquote>

                <Title level={2} id="sec-3">3. Kết luận và các bước tiếp theo</Title>
                <Paragraph>Hành trình này đòi hỏi sự thay đổi tư duy...</Paragraph>
              </div>

              {/* FOOTER BÀI VIẾT */}
              <footer className={cx("article-footer")}>
                <div className={cx("tags-list")}>
                  <Tag>#Microservices</Tag>
                  <Tag>#.NET8</Tag>
                  <Tag>#Architecture</Tag>
                  <Tag>#DDD</Tag>
                </div>
                <Divider />
                <div className={cx("share-bar")}>
                  <Text strong>Chia sẻ bài viết:</Text>
                  <Space>
                    <Button shape="circle" icon={<TwitterCircleFilled />} />
                    <Button shape="circle" icon={<LinkedinFilled />} />
                    <Button shape="circle" icon={<LinkOutlined />} />
                  </Space>
                </div>
              </footer>
            </article>
          </Col>

          {/* --- CỘT PHẢI: SIDEBAR CAO CẤP --- */}
          <Col xs={24} lg={7} order={2} className={cx("sidebar-col")}>
            <Affix offsetTop={100}> {/* Dùng Affix thay vì position sticky thủ công */}
              <aside className={cx("sidebar-wrapper")}>
                
                {/* AUTHOR BIO WIDGET */}
                <div className={cx("widget", "author-widget")}>
                  <Title level={5} className={cx("widget-title")}>VỀ TÁC GIẢ</Title>
                  <div className={cx("bio-content")}>
                    <Avatar src="/avatar.png" size={64} />
                    <Title level={4} style={{margin: '12px 0 4px'}}>cr0issant</Title>
                    <Text type="secondary">10+ năm kinh nghiệm xây dựng hệ thống phân tán tải cao. Đam mê chia sẻ kiến thức về .NET và Cloud Native.</Text>
                    <Button type="primary" block style={{marginTop: 16}}>Theo dõi</Button>
                  </div>
                </div>

                {/* TABLE OF CONTENTS (Mục lục) */}
                <div className={cx("widget", "toc-widget")}>
                  <Title level={5} className={cx("widget-title")}>MỤC LỤC</Title>
                  <ul className={cx("toc-list")}>
                    <li className={cx("active")}><a href="#sec-1">1. Tại sao Monolith thất bại?</a></li>
                    <li><a href="#sec-2">2. Thiết kế Domain-Driven (DDD)</a></li>
                    <li className={cx("sub-item")}><a href="#sec-2-1">2.1. Bounded Contexts</a></li>
                    <li><a href="#sec-3">3. Kết luận</a></li>
                  </ul>
                </div>

              </aside>
            </Affix>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default BlogDetail;