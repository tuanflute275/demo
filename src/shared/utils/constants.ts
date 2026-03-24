import type { InputNumberProps } from "antd";

// Auth
export const ACCESS_TOKEN_KEY = "accessToken";
export const ALL_PERMISSION = "allPermission";

// Người dùng
export const USER_INFO_KEY = "userInfo";
export const USER_PERMISSIONS_KEY = "userPermissions";

export const VALIDATE_MESSAGES = {
  required: "Thông tin bắt buộc !",
  types: {
    email: "Email không hợp lệ !",
    number: "Số không hợp lệ !",
  },
  number: {
    range: "${label} phải nằm trong khoảng từ ${min} đến ${max}",
  },
  string: {
    max: "${label} không vượt quá ${max} ký tự",
  },
};

// format số
export const formatter: InputNumberProps<number>["formatter"] = (value) => {
  const [start, end] = `${value}`.split(".") || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${end ? `${v}.${end}` : `${v}`}`;
};

export const TRANG_THAI_VALUE = {
  KHONG_HOAT_DONG: 0,
  HOAT_DONG: 1,
};

export const TRANG_THAI_OPTIONS = [
  { label: "Hoạt động", value: TRANG_THAI_VALUE.HOAT_DONG },
  { label: "Không hoạt động", value: TRANG_THAI_VALUE.KHONG_HOAT_DONG },
];

export const LOAI_VAI_TRO_VALUE = {
  USER: 0,
  ADMIN: 1,
};

export const LOAI_NGAY_SINH = {
  NGAY_THANG_NAM: 1,
  THANG_NAM: 2,
  NAM: 3,
};

