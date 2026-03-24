import React, { useState } from 'react';
import { Progress, Button } from 'antd';
import { 
  CheckCircleFilled, CoffeeOutlined, 
  ThunderboltFilled, FireFilled, RightOutlined, 
  MessageOutlined
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface SidebarProps {
  collapsed?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile, onClose }) => {
  const [activeLesson, setActiveLesson] = useState(6);
  // Data mẫu
  const lessons = [
    { id: 1, title: 'Giới thiệu & Lộ trình', done: true },
    { id: 2, title: 'Cài đặt môi trường .NET', done: true },
    { id: 3, title: 'Cấu trúc project C#', done: true },
    { id: 4, title: 'Biến & Kiểu dữ liệu', done: true },
    { id: 5, title: 'LINQ & Collections', done: true },
    { id: 6, title: 'Dựng API với ASP.NET Core', active: true },
    { id: 7, title: 'Entity Framework Core', done: false },
    { id: 8, title: 'Authentication & JWT', done: false },
    { id: 9, title: 'Unit Testing cơ bản', done: false },
    { id: 10, title: 'Deploy ứng dụng lên Azure', done: false },
    { id: 11, title: 'Microservices Architect', done: false },
    { id: 12, title: 'Design Patterns', done: false },
    { id: 13, title: 'Clean Architecture', done: false },
    { id: 14, title: 'Performance Tuning', done: false }
  ];

  const handleLessonClick = (id: number) => {
    setActiveLesson(id);
    if (isMobile && onClose) onClose();
  };

  return (
    <div className={cx('sidebar-wrapper', { collapsed })}>
      <div className={cx('brand-header')}>
        <div className={cx('logo-box')}><FireFilled /></div>
        {!collapsed && (
          <Link to="/" className={cx('brand-name')}>
            Back Home
          </Link>
        )}
      </div>

      {!collapsed && (
        <>
          <div className={cx('progress-section')}>
            <div className={cx('progress-card')}>
              <div className={cx('info-row')}>
                <span className={cx('label')}><ThunderboltFilled /> TIẾN ĐỘ HỌC</span>
                <span className={cx('percent')}>15%</span>
              </div>
              <Progress 
                percent={15} 
                showInfo={false} 
                strokeColor={{ '0%': '#36cfc9', '100%': '#1890ff' }} 
                strokeWidth={8} 
                trailColor="rgba(0,0,0,0.02)" 
              />
              <div className={cx('sub-text')}>Đã xong <strong>5/52</strong> bài</div>
            </div>
          </div>

          <div className={cx('lesson-list')}>
            {lessons.map((lesson) => (
              <div key={lesson.id} className={cx('lesson-item', { active: lesson.id === activeLesson })} onClick={() => handleLessonClick(lesson.id)}>
                {lesson.done ? <CheckCircleFilled className={cx('icon-check')} /> : <div className={cx('index-box')}>{lesson.id}</div>}
                <div className={cx('content-box')}>
                  <span className={cx('title')}>{lesson.title}</span>
                  {lesson.id === activeLesson && <span className={cx('learning-status')}>Đang học</span>}
                </div>
                {lesson.id === activeLesson && <RightOutlined className={cx('arrow-icon')} />}
              </div>
            ))}
          </div>

          <div className={cx('footer-actions')}>
            <Button block icon={<CoffeeOutlined />} className={cx('btn-coffee')}>Mời tôi ly cà phê</Button>
            <Button block icon={<MessageOutlined />} className={cx('btn-feedback')}> Gửi góp ý </Button>
          </div>
        </>
      )}
      
      {collapsed && <div className={cx('collapsed-view')}><ThunderboltFilled className={cx('collapsed-icon')} /></div>}
    </div>
  );
};

export default Sidebar;