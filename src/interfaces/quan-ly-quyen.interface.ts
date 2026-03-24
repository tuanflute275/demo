import { type HierarchicalRecord } from '@/shared/utils/helper';

// Interface cho API response
export interface PermissionApiItem {
  id: string;
  chaId: string | null;
  ma: string;
  ten: string;
  tenKhongdau?: string | null;
  kieu?: number | null;
  duongDan?: string;
  ngayTao?: string;
  trangThai: number;
  capQuanly?: number | null;
  children?: PermissionApiItem[];
}

// Interface cho quản lý quyền
export interface Permission {
  id: string;
  permissionCode: string;
  permissionName: string;
  description: string;
  managementLevel: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface PermissionFormData {
  id:string;
  permissionCode: string;
  permissionName: string;
  description: string;
  managementLevel: number;
  status: 'active' | 'inactive';
}

export interface PermissionSearchParams {
  permissionCode?: string;
  permissionName?: string;
  managementLevel?: number;
  status?: 'active' | 'inactive';
  page?: number;
  pageSize?: number;
}

export interface PermissionTableData extends Record<string, unknown>, HierarchicalRecord {
  id: string;
  idCha?: string | null;
  ma?: string;
  ten?: string;
  tenKhongdau?: string | null;
  kieu?: number | null;
  duongDan?: string;
  ngayTao?: string;
  trangThai?: number;
  capQuanly?: number | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  children?: PermissionTableData[];
}