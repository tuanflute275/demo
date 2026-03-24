import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: '#006391',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    
    // Layout
    borderRadius: 8,
    
    // Typography
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    
    // Spacing
    padding: 16,
    margin: 16,
    
    // Background
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    
    // Border
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
  },
  components: {
    Layout: {
      headerBg: '#006391',
      siderBg: '#006391',
      triggerBg: '#004d73',
    },
    Menu: {
      darkItemBg: '#006391',
      darkItemSelectedBg: '#004d73',
      darkItemHoverBg: '#007cb8',
    },
    Button: {
      borderRadius: 8,
      primaryShadow: '0 2px 0 rgba(0, 99, 145, 0.1)',
    },
    Table: {
      headerBg: '#006391',
      headerColor: '#ffffff',
    },
    Tabs: {
      inkBarColor: '#006391',
      itemSelectedColor: '#006391',
      itemHoverColor: '#007cb8',
    },
    Pagination: {
      itemActiveBg: '#006391',
    },
  },
  algorithm: [], // Có thể thêm dark mode algorithm sau
};

export default antdTheme;