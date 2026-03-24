/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOAI_NGAY_SINH } from "./constants";
import type { DateFormat } from "@/components/common/MultiTypeDatePicker";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

/**
 * Các hàm tiện ích chung
 */
export function GetValueEnviroment(key: string): string {
  const value = import.meta.env[key] || "";
  return value;
}

/**
 * Chuyển đổi loại ngày sinh thành định dạng date picker
 * @param loai Loại ngày sinh (1: ngày/tháng/năm, 2: tháng/năm, 3: năm)
 * @returns DateFormat cho MultiTypeDatePicker
 */
export const convertLoaiNgaysinhToFormat = (
  loai: number | string | undefined
): DateFormat => {
  const loaiNumber = Number(loai);
  switch (loaiNumber) {
    case LOAI_NGAY_SINH.NGAY_THANG_NAM: // 1
      return "day";
    case LOAI_NGAY_SINH.THANG_NAM: // 2
      return "month";
    case LOAI_NGAY_SINH.NAM: // 3
      return "year";
    default:
      return "day";
  }
};

// Extend dayjs với plugin customParseFormat
dayjs.extend(customParseFormat);

/**
 * Convert string date từ API thành dayjs object
 * Hỗ trợ các format: DD/MM/YYYY, MM/YYYY, YYYY
 * @param dateString Chuỗi ngày từ API (31/10/2003, 10/2003, 2003)
 * @returns Dayjs object hoặc null nếu invalid
 */
export const convertApiDateToDay = (
  dateString: string | null | undefined
): Dayjs | null => {
  if (!dateString || typeof dateString !== "string") {
    return null;
  }

  const trimmedDate = dateString.trim();

  // Kiểm tra các format khác nhau
  let parsedDate: Dayjs | null = null;

  // Format: DD/MM/YYYY (31/10/2003)
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmedDate)) {
    parsedDate = dayjs(trimmedDate, "DD/MM/YYYY", true);
  }
  // Format: MM/YYYY (10/2003)
  else if (/^\d{1,2}\/\d{4}$/.test(trimmedDate)) {
    parsedDate = dayjs(trimmedDate, "MM/YYYY", true);
  }
  // Format: YYYY (2003)
  else if (/^\d{4}$/.test(trimmedDate)) {
    parsedDate = dayjs(trimmedDate, "YYYY", true);
  }
  // Fallback: thử parse tự động
  else {
    parsedDate = dayjs(trimmedDate);
  }

  // Kiểm tra tính hợp lệ
  if (parsedDate && parsedDate.isValid()) {
    return parsedDate;
  }

  console.warn(`⚠️ Cannot parse date: "${dateString}"`);
  return null;
};

/**
 * Convert dayjs object thành string format để gửi API
 * @param date Dayjs object
 * @param loaiNgaysinh Loại ngày sinh (1: DD/MM/YYYY, 2: MM/YYYY, 3: YYYY)
 * @returns String format tương ứng
 */
export const convertDayToApiFormat = (
  date: Dayjs | null | undefined,
  loaiNgaysinh?: number | string
): string | null => {
  if (!date || !date.isValid()) {
    return null;
  }

  const loaiNumber = Number(loaiNgaysinh);

  switch (loaiNumber) {
    case LOAI_NGAY_SINH.NGAY_THANG_NAM: // 1 - DD/MM/YYYY
      return date.format("DD/MM/YYYY");
    case LOAI_NGAY_SINH.THANG_NAM: // 2 - MM/YYYY
      return date.format("MM/YYYY");
    case LOAI_NGAY_SINH.NAM: // 3 - YYYY
      return date.format("YYYY");
    default:
      // Mặc định là DD/MM/YYYY
      return date.format("DD/MM/YYYY");
  }
};

/**
 * Interface cho dữ liệu cây với cấu trúc phân cấp
 */
export interface TreeDataItem {
  children?: TreeDataItem[];
  [key: string]: unknown;
}

/**
 * Interface cho bản ghi có quan hệ cha-con
 */
export interface HierarchicalRecord {
  chaId?: string | null;
  [key: string]: unknown;
}

/**
 * Tạo STT phân cấp dựa trên chỉ số
 * @param index Chỉ số hiện tại của bản ghi
 * @param parentIndex Chỉ số cha tùy chọn cho các mục lồng nhau
 * @returns Chuỗi STT phân cấp (ví dụ: "1", "1.1", "1.2", "2", "2.1")
 */
export const generateTreeSTT = (
  index: number,
  parentIndex?: number
): string => {
  if (typeof parentIndex === "number") {
    // Nút con: chỉ_số_cha.chỉ_số_con
    return `${parentIndex + 1}.${index + 1}`;
  } else {
    // Nút cha: chỉ cần chỉ số
    return (index + 1).toString();
  }
};

/**
 * Tạo STT tuần tự đơn giản cho dữ liệu phẳng
 * @param index Chỉ số hiện tại trong mảng
 * @param currentPage Trang hiện tại (mặc định: 1)
 * @param pageSize Số item trên mỗi trang (mặc định: 10)
 * @returns Chuỗi STT tuần tự theo pagination
 */
export const generateSTT = (
  index: number,
  currentPage: number = 1,
  pageSize: number = 10
): string => {
  return ((currentPage - 1) * pageSize + index + 1).toString();
};

/**
 * Kiểm tra xem một record có phải là bản ghi con (có chaId) không
 * @param record Bản ghi cần kiểm tra
 * @returns true nếu là bản ghi con, false nếu là bản ghi cha
 */
export const isChildRecord = <T extends HierarchicalRecord>(
  record: T
): boolean => {
  const r = record as any;
  return (
    (r.chaId !== undefined && r.chaId !== null) ||
    (r.maCha !== undefined && r.maCha !== null) ||
    (r.parentId !== undefined && r.parentId !== null)
  );
};

/**
 * Kiểm tra xem một record có phải là bản ghi cha (không có chaId) không
 * @param record Bản ghi cần kiểm tra
 * @returns true nếu là bản ghi cha, false nếu là bản ghi con
 */
export const isParentRecord = <T extends HierarchicalRecord>(
  record: T
): boolean => {
  return (
    record.chaId === null ||
    (record.chaId === undefined && record.maCha === null) ||
    record.maCha === undefined
  );
};

/**
 * Tải file từ base64 string (thường dùng cho export)
 * @param base64String Base64 encoded file contents
 * @param filename Tên file gợi ý
 * @param contentType MIME type
 */
export const downloadBase64File = (
  base64String: string,
  filename = "file.bin",
  contentType = "application/octet-stream"
): void => {
  try {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("downloadBase64File error:", error);
    throw error;
  }
};

/**
 * Upload a file via FormData to given endpoint and return API response
 * @param url API endpoint to POST the file to
 * @param file File object selected from input
 * @param fieldName Form field name for the file (default: 'file')
 */
export const uploadFile = async (
  url: string,
  file: File,
  fieldName = "file"
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append(fieldName, file, file.name);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload failed: ${response.status} ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("uploadFile error:", error);
    throw error;
  }
};

export const getUnsavedChangesContent = (
  customMessage?: string
): React.ReactElement => {
  const defaultMessage = "Bạn có thay đổi chưa lưu. Bạn có muốn tiếp tục hủy?";
  const message = customMessage || defaultMessage;

  return React.createElement(
    "div",
    { style: { textAlign: "center" } },
    React.createElement(FontAwesomeIcon, {
      icon: faExclamationTriangle,
      style: { fontSize: "80px", color: "#faad14", marginBottom: "20px" },
    }),
    React.createElement("p", null, message)
  );
};

export const removeAccents = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
