import { useMemo } from 'react';
import { useUserStorage } from '@/shared/hook/useUserStorage';
// import { MENU_PERMISSIONS, PERMISSIONS } from '../utils/const-permission';

interface Permission {
  id: string;
  chaId: string | null;
  ma: string;
  ten: string;
  trangThai: number;
}

export const usePermissions = () => {
  const { getUserInfo, getUserPermissions } = useUserStorage();
  
  // Lấy thông tin người dùng từ localStorage
  const user = useMemo(() => {
    const userInfo = getUserInfo();
    const permissions = getUserPermissions();
    
    if (!userInfo) return null;
    
    return {
      ...userInfo,
      permissions, // Permissions từ API
    };
  }, [getUserInfo, getUserPermissions]);

  // Kiểm tra người dùng có quyền (một hoặc nhiều quyền)
  const hasPermission = useMemo(() => {
    return (permission: string | string[]): boolean => {
      
      // Nếu là user có soDinhDanh = '0', luôn có full quyền
      if (user?.soDinhDanh === '0') {
        return true;
      }
      
      if (!user || !user.permissions || !Array.isArray(user.permissions)) return false;
      
      if (Array.isArray(permission)) {
        // Kiểm tra có ít nhất một permission trong array
        return permission.some(p => user.permissions.some((userPerm: Permission) => userPerm.ma === p));
      }
      
      return user.permissions.some((userPerm: Permission) => userPerm.ma === permission);
    };
  }, [user]);

  // Kiểm tra người dùng có tất cả các quyền trong danh sách
  const hasAllPermissions = useMemo(() => {
    return (permissions: string[]): boolean => {
      // Nếu là user có soDinhDanh = '0', luôn có full quyền
      if (user?.soDinhDanh === '0') {
        return true;
      }
      
      if (!user || !user.permissions || !Array.isArray(user.permissions)) return false;
      return permissions.every(p => user.permissions.some((userPerm: Permission) => userPerm.ma === p));
    };
  }, [user]);

  // Kiểm tra người dùng có thể truy cập menu theo key
  const canAccessMenu = useMemo(() => {
    return (menuKey: string): boolean => {
      // Nếu là user có soDinhDanh = '0', luôn có full quyền
      if (user?.soDinhDanh === '0') {
        return true;
      }

      // Kiểm tra đặc biệt cho menu "Quản trị Hệ thống" (key "2" và con)
      if (menuKey === "2" || menuKey.startsWith("2-")) {
        // Chỉ user có loaiVaitro = 1 mới được xem menu Quản trị Hệ thống
        if (user?.loaiVaitro !== 1) {
          return false;
        }
      }

      // const requiredPermissions = MENU_PERMISSIONS[menuKey as keyof typeof MENU_PERMISSIONS];
      // if (!requiredPermissions || requiredPermissions.length === 0) return true;
      
      // return hasPermission(requiredPermissions);

      return true;
    };
  }, [hasPermission, user]);

  // Lọc danh sách menu items theo quyền người dùng (bao gồm cả children)
  const getVisibleMenuItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (menuItems: any[]): any[] => {
      return menuItems.filter(item => {
        // Kiểm tra permission cho menu item
        if (!canAccessMenu(item.key)) return false;
        
        // Nếu có children, lọc children theo permissions
        if (item.children) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const visibleChildren = item.children.filter((child: any) => 
            canAccessMenu(child.key)
          );
          
          // Chỉ hiển thị parent nếu có ít nhất 1 child visible
          if (visibleChildren.length === 0) return false;
          
          // Cập nhật children đã được lọc
          item.children = visibleChildren;
        }
        
        return true;
      });
    };
  }, [canAccessMenu]);

  return {
    user,
    hasPermission,
    hasAllPermissions,
    canAccessMenu,
    getVisibleMenuItems,
    // permissions: PERMISSIONS,
    permissions: [],
  };
};

