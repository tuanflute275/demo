// import {
//     ClockCircleOutlined,
//     DownloadOutlined,
//     EyeOutlined,
//     LeftOutlined,
//     LikeOutlined,
//     RightOutlined,
//     ShareAltOutlined,
//     CodeOutlined
// } from '@ant-design/icons';
// import { Button, Divider, Space, Tabs, Tag, Typography } from 'antd';
// import classNames from 'classnames/bind';
// import { useState } from 'react';
// import styles from './Lesson.module.scss';
// import CodeEditor from '../CodeEditor/CodeEditor';

// const cx = classNames.bind(styles);
// const { Paragraph } = Typography;

// const Lesson = () => {
//     const [_activeTab, setActiveTab] = useState('1');

//     // 1. Tab Mô tả
//     const DescriptionTab = () => (
//         <div className={cx('description-content')}>
//             <Paragraph>
//                 Trong bài học này, chúng ta sẽ đi sâu vào việc xây dựng một <strong>RESTful API</strong> hoàn chỉnh sử dụng .NET 8.
//                 Bạn sẽ học cách cấu hình <code>Program.cs</code>, sử dụng Dependency Injection và kết nối Entity Framework Core.
//             </Paragraph>

//             <h3>Nội dung chính:</h3>
//             <ul>
//                 <li>Khởi tạo Web API Project với .NET CLI</li>
//                 <li>Cấu trúc thư mục chuẩn: Controllers, Models, Data</li>
//                 <li>Cấu hình Connection String trong <code>appsettings.json</code></li>
//                 <li>Tạo Migration đầu tiên và update Database</li>
//             </ul>

//             <h3>Tài nguyên đính kèm:</h3>
//             <Space className={cx('resource-buttons')} size="middle">
//                 <Button icon={<DownloadOutlined />}>Source Code (Zip)</Button>
//                 <Button icon={<DownloadOutlined />}>Slide bài giảng (PDF)</Button>
//             </Space>
//         </div>
//     );

//     // 2. Tab Thực hành (Code Editor nằm ở đây)
//     const PracticeTab = () => (
//         <div style={{ padding: '20px 0' }}>
//             <div style={{ marginBottom: 16 }}>
//                 <h3 style={{ margin: 0 }}>Thực hành: Cấu hình Program.cs</h3>
//                 <p style={{ color: '#666' }}>
//                     Yêu cầu: Hãy sửa đổi đoạn code bên dưới để đăng ký dịch vụ (Service) vào container.
//                 </p>
//             </div>

//             {/* Code Editor được đặt trong ngữ cảnh bài tập */}
//             <CodeEditor />
//         </div>
//     );

//     // 3. Tab Hỏi đáp
//     const QnATab = () => (
//         <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
//             <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" alt="empty" style={{ width: 100, marginBottom: 16 }} />
//             <p>Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!</p>
//             <Button type="primary" ghost>Đặt câu hỏi ngay</Button>
//         </div>
//     );

//     // Cấu hình danh sách Tabs
//     const items = [
//         {
//             key: '1',
//             label: 'Nội dung bài học',
//             children: <DescriptionTab />
//         },
//         {
//             key: 'code', // Key mới cho tab Code
//             label: <span><CodeOutlined /> Thực hành</span>, // Thêm icon cho nổi bật
//             children: <PracticeTab />
//         },
//         {
//             key: '2',
//             label: 'Hỏi đáp & Thảo luận',
//             children: <QnATab />
//         },
//         {
//             key: '3',
//             label: 'Ghi chú',
//             children: <div style={{ padding: 20 }}>Chức năng ghi chú đang phát triển...</div>
//         },
//     ];

//     return (
//         <div className={cx('lesson-wrapper')}>
//             {/* 1. VIDEO PLAYER */}
//             <div className={cx('video-section')}>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/gAAYHpoEwyY?si=TwtwVD32cQYIbc95" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
//             </div>

//             {/* 2. HEADER INFO */}
//             <div className={cx('lesson-header')}>
//                 <div className={cx('title-area')}>
//                     <h1 className={cx('title')}>6. Dựng API với ASP.NET Core: Khởi tạo Project & Cấu hình</h1>
//                     <div className={cx('meta-info')}>
//                         <span><ClockCircleOutlined /> Cập nhật tháng 10/2025</span>
//                         <span><EyeOutlined /> 12,453 lượt học</span>
//                         <Tag color="blue">Backend</Tag>
//                         <Tag color="cyan">.NET 8</Tag>
//                     </div>
//                 </div>

//                 <div className={cx('nav-buttons')}>
//                     <Button className={cx('btn-prev')} icon={<LeftOutlined />}>Bài trước</Button>
//                     <Button type="primary" className={cx('btn-next')}>Bài tiếp theo <RightOutlined /></Button>
//                 </div>
//             </div>

//             <Divider style={{ margin: '0 0 20px 0' }} />

//             {/* 3. INTERACTION BAR */}
//             <div className={cx('interaction-bar')} style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
//                 <Button icon={<LikeOutlined />}>Thích</Button>
//                 <Button icon={<ShareAltOutlined />}>Chia sẻ</Button>
//                 <Button icon={<DownloadOutlined />}>Tải xuống</Button>
//             </div>

//             {/* 4. TABS CONTENT (Code Editor đã nằm trong này) */}
//             <Tabs
//                 defaultActiveKey="1"
//                 items={items}
//                 onChange={setActiveTab}
//                 className={cx('content-tabs')}
//             />
//         </div>
//     );
// }

// export default Lesson;