import React from 'react';
import { Layout, Button, Avatar, Space, Typography } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  UserOutlined,
  CommentOutlined,  // Icon thảo luận
  ReadFilled
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const { Header: AntHeader } = Layout;
const { Text } = Typography;
const lessonName = "6. Dựng API với ASP.NET Core: Khởi tạo & Cấu hình môi trường Microservices";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isMobile: boolean;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, isMobile, onMenuClick }) => {
  return (
    <AntHeader className={cx('header-container')}>
      <div className={cx('left-section')}>
        {/* Toggle Button */}
        <Button
          type="text"
          className={cx('toggle-btn')}
          icon={isMobile ? <MenuOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
          onClick={() => isMobile ? onMenuClick() : setCollapsed(!collapsed)}
        />

        {/* Bài học hiện tại */}
        <div className={cx('breadcrumb-area')}>
          <div className={cx('course-info')}>
            {/* <Text className={cx('course-name')}>C# Mastery</Text> */}
            {/* <RightOutlined className={cx('separator')} /> */}
            <Text
              className={cx('lesson-name')}
              ellipsis={{ tooltip: lessonName }} // Tự động cắt và hiện tooltip
            >
              {lessonName}
            </Text>
          </div>

          {/* --- BADGE ĐẾM BÀI --- */}
          <div className={cx('lesson-badge')}>
            <ReadFilled className={cx('icon-book')} />
            <span className={cx('counter-text')}>
              <span className={cx('current')}>06</span>
              <span className={cx('divider')}>/</span>
              52
            </span>
          </div>
        </div>
      </div>


      <div className={cx('right-section')}>
        <Space size="middle">
          {/* Nút Thảo luận có icon */}
          {!isMobile && (
            <Button type="text" icon={<CommentOutlined />} className={cx('btn-discuss')}>
              Thảo luận
            </Button>
          )}

          {/* Avatar */}
          <Avatar size="large" icon={<UserOutlined />} className={cx('user-avatar')} />
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;