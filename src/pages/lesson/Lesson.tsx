import {
  BulbOutlined,
  FlagOutlined,
  LeftOutlined,
  LikeOutlined,
  MenuOutlined,
  MessageOutlined,
  RightOutlined,
  SendOutlined,
  ShareAltOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import {
  Alert,
  Button,
  FloatButton,
  message,
  Tag,
  Typography
} from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import styles from "./Lesson.module.scss";

const cx = classNames.bind(styles);
const { Title, Paragraph } = Typography;

const Lesson = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);



  // --- 2. LOGIC XỬ LÝ QUIZ ---
  const handleQuizSubmit = () => {
    if (selectedAnswer === 2) {
      // Giả sử đáp án C (index 2) là đúng
      message.success("Tuyệt vời! Bạn đã nắm vững kiến thức về Singleton.");
    } else {
      message.error("Rất tiếc, hãy thử đọc lại phần DI Container nhé!");
    }
    setIsSubmitted(true);
  };

  return (
    <div className={cx("lesson-wrapper")}>
      {/* --- MAIN CONTENT AREA --- */}
      <main className={cx("main-content")}>
        {/* HERO SECTION */}
        <header style={{ marginBottom: 60 }}>
          <Tag color="blue" style={{ marginBottom: 16 }}>
            FOUNDATION MODULE
          </Tag>
          <h1>
            Làm chủ cấu hình ASP.NET Core 8.0
          </h1>
          <Paragraph style={{ fontSize: 20, color: "#5f6368", marginTop: 16 }}>
            Khám phá cách .NET quản lý vòng đời ứng dụng và thiết lập hệ thống
            Dependency Injection (DI) mạnh mẽ để xây dựng ứng dụng chuẩn
            Enterprise.
          </Paragraph>
        </header>
        {/* SECTION 1: LÝ THUYẾT */}
        <section className={cx("section-container")}>
          <Title level={2}>1. Hiểu về Middleware Pipeline</Title>
          <Paragraph>
            Trong .NET 8, luồng xử lý HTTP Request được quản lý bởi một chuỗi
            các <span className={cx("keyword")}>Middleware</span>. Mỗi
            Middleware có quyền xử lý Request và quyết định xem có chuyển nó cho
            trạm kế tiếp hay không.
          </Paragraph>

          <div className={cx("insight-box")}>
            <h4>
              <BulbOutlined /> Ghi nhớ từ chuyên gia
            </h4>
            <p>
              "Thứ tự đăng ký Middleware trong file <strong>Program.cs</strong>{" "}
              chính là thứ tự mà Request sẽ đi qua. Sai một ly, đi một dặm bảo
              mật!"
            </p>
          </div>
        </section>
        {/* SECTION 2: PRACTICE MISSION (CODE EDITOR) */}
        <section className={cx('practice-section')}>
          <div className={cx('section-label')}>
            <ThunderboltOutlined /> THỰC HÀNH NGAY
          </div>
          <h3>Thử thách 1: Khởi tạo Middleware</h3>
          <Paragraph>
            Hãy thử thay đổi dòng code bên dưới để thêm một Middleware tùy chỉnh in ra log mỗi khi có request gửi đến.
          </Paragraph>
          <CodeEditor />
        </section>

        {/* SECTION 3: QUIZ (GAMIFIED) */}
        <section className={cx("quiz-container")}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Tag icon={<FlagOutlined />} color="error">
              KIỂM TRA CUỐI BÀI
            </Tag>
            <Title level={2} style={{ marginTop: 8 }}>
              Kiểm tra nhanh kiến thức
            </Title>
          </div>

          <div className={cx("quiz-card")}>
            <div className={cx("question")}>
              Câu hỏi: Vòng đời (Lifetime) nào của Service sẽ tạo một bản thực
              thi duy nhất cho toàn bộ vòng đời của ứng dụng?
            </div>

            <div className={cx("options-grid")}>
              {[
                "AddTransient() - Tạo mới mỗi khi gọi",
                "AddScoped() - Tạo mới theo mỗi Request",
                "AddSingleton() - Chỉ tạo một lần duy nhất",
                "AddInstance() - Không tồn tại trong .NET 8",
              ].map((option, index) => (
                <div
                  key={index}
                  className={cx("option-item", {
                    selected: selectedAnswer === index,
                  })}
                  onClick={() => !isSubmitted && setSelectedAnswer(index)}
                >
                  <div className={cx("radio-circle")} />
                  {option}
                </div>
              ))}
            </div>

            <Button
              type="primary"
              size="large"
              block
              style={{ marginTop: 32, height: 50, fontWeight: 700 }}
              icon={<SendOutlined />}
              disabled={selectedAnswer === null || isSubmitted}
              onClick={handleQuizSubmit}
            >
              XÁC NHẬN ĐÁP ÁN
            </Button>

            {isSubmitted && (
              <Alert
                message={selectedAnswer === 2 ? "Chính xác!" : "Chưa đúng rồi!"}
                description={
                  selectedAnswer === 2
                    ? "Singleton đảm bảo ứng dụng chỉ sử dụng một đối tượng duy nhất, giúp tiết kiệm tài nguyên bộ nhớ."
                    : "Hãy nhớ rằng Scoped chỉ tồn tại trong 1 Request, còn Transient tạo mới liên tục. Singleton mới là đáp án đúng."
                }
                type={selectedAnswer === 2 ? "success" : "warning"}
                showIcon
                style={{ marginTop: 24, borderRadius: 12 }}
              />
            )}
          </div>
        </section>
        {/* SECTION 5: NEXT / PREV NAVIGATION */}
        <div className={cx("bottom-pagination")}>
          <a href="/lesson/5" className={cx("nav-card", "prev")}>
            <span className={cx("label")}>BÀI TRƯỚC</span>
            <div className={cx("title-link")}>
              <LeftOutlined /> 5. Tổng quan HTTP Protocol
            </div>
          </a>

          <a href="/lesson/7" className={cx("nav-card", "next")}>
            <span className={cx("label")}>BÀI TIẾP THEO</span>
            <div className={cx("title-link")}>
              7. Làm việc với Entity Framework <RightOutlined />
            </div>
          </a>
        </div>
      </main>

      {/* 🚀 CỤM NÚT ĐIỀU HƯỚNG NỔI (FLOAT ACTIONS) */}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 16, bottom: 24 }}
        icon={<MenuOutlined />}
        className={cx('custom-fab-group')}
      >
        {/* Nút Like có Badge hiện số lượng */}
        <FloatButton
          icon={<LikeOutlined />}
          tooltip={<div>Thích bài học</div>}
        />

        {/* Nút Share */}
        <FloatButton
          icon={<ShareAltOutlined />}
          tooltip={<div>Chia sẻ</div>}
        />

        {/* Nút HỎI AI - Thiết kế đặc biệt làm điểm nhấn */}
        <FloatButton
          tooltip={<div>Hỏi AI trợ giúp</div>}
          type="primary"
          icon={<MessageOutlined />}
          description="AI"
          shape="square"
          className={cx('btn-ask-ai-neon')}
          onClick={() => message.info('AI đang sẵn sàng hỗ trợ bạn!')}
          style={{ width: 40, right: 0 }}
        />
      </FloatButton.Group>
    </div>
  );
};

export default Lesson;
