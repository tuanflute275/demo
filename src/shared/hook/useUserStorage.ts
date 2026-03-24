import { useCallback } from 'react';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY, USER_PERMISSIONS_KEY } from '@/shared/utils/constants';

// Custom hook để quản lý user data trong localStorage
export const useUserStorage = () => {
  // Lưu thông tin đăng nhập
  const setUserData = useCallback((userInfo: unknown, permissions: unknown) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    localStorage.setItem(USER_PERMISSIONS_KEY, JSON.stringify(permissions));
  }, []);

  // Lấy access token
  const getAccessToken = useCallback((): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  // Lấy thông tin người dùng
  const getUserInfo = useCallback(() => {
    try {
      const userInfo = localStorage.getItem(USER_INFO_KEY);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Error parsing user info:', error);
      return null;
    }
  }, []);

  // Lấy quyền người dùng
  const getUserPermissions = useCallback((): string[] => {
    try {
      const permissions = localStorage.getItem(USER_PERMISSIONS_KEY);
      return permissions ? JSON.parse(permissions) : [];
    } catch (error) {
      console.error('Error parsing user permissions:', error);
      return [];
    }
  }, []);

  // Xóa tất cả thông tin người dùng (logout)
  const clearUserData = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(USER_PERMISSIONS_KEY);
  }, []);

  // Kiểm tra đã đăng nhập chưa
  const isLoggedIn = useCallback((): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  return {
    setUserData,
    getAccessToken,
    getUserInfo,
    getUserPermissions,
    clearUserData,
    isLoggedIn,
  };
};