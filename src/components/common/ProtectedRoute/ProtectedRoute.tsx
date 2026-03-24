import React from 'react';
import { usePermissions } from '@/shared/hook/usePermissions';
import Page403 from '@/pages/Error/Page403';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: string; //Check 1 quyền đơn
  requiredPermissions?: string[]; //Check nhiều quyền cùng lúc (and hoặc or)
  requireAll?: boolean; // true: cần tất cả permissions, false: chỉ cần 1 permission
  isProtected?: boolean; // true: check permissions, false: auto pass
  requireAdminRole?: boolean; // true: require loaiVaitro = 1
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  requiredPermissions,
  requireAll = false,
  isProtected = true,
  requireAdminRole = false
}) => {
  const { hasPermission, user } = usePermissions();

  // If not protected, auto pass
  if (!isProtected) {
    return <>{children}</>;
  }

  // Check admin role first (if required)
  if (requireAdminRole) {
    // Ưu tiên user có soDinhDanh = '0'
    if (user?.soDinhDanh !== '0' && user?.loaiVaitro !== 1) {
      return <Page403 />;
    }
  }

  // Check single permission
  if (permission && !hasPermission(permission)) {
    return <Page403 />;
  }

  // Check multiple permissions
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAll
      ? requiredPermissions.every(perm => hasPermission(perm))
      : requiredPermissions.some(perm => hasPermission(perm));

    if (!hasRequiredPermissions) {
      return <Page403 />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;