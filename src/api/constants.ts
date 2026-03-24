import { GetValueEnviroment } from "@/shared/utils/helper";

GetValueEnviroment("VITE_API_BASE_URL");
// API Constants
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    LOGIN_UAT: "/api/v1/auth/login-uat",
  },

  QUYEN: {
    TIM_KIEM: "/api/v1/dm-quyen/tim-kiem",
    CHI_TIET: "/api/v1/dm-quyen/chi-tiet",
    CREATE: "/api/v1/dm-quyen/them-moi-cap-nhat",
    DELETE: `/api/v1/dm-quyen/xoa`,
    EXPORT: "/api/v1/dm-quyen/export-data",
    IMPORT: "/api/v1/dm-quyen/import-data",
  },

  LOG_USER: "/api/v1/logs",
};

// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Request Timeout
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Lỗi kết nối mạng",
  TIMEOUT_ERROR: "Yêu cầu quá thời gian chờ",
  UNAUTHORIZED: "Bạn không có quyền truy cập",
  FORBIDDEN: "Truy cập bị từ chối",
  NOT_FOUND: "Không tìm thấy dữ liệu",
  SERVER_ERROR: "Lỗi máy chủ nội bộ",
  UNKNOWN_ERROR: "Lỗi không xác định",
} as const;
