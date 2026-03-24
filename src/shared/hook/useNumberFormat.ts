import { useMemo } from 'react';

/**
 * Hook để format số với phân cách hàng nghìn và làm tròn số thập phân
 */
export const useNumberFormat = () => {
  const formatNumber = useMemo(() => {
    return (
      value: number | string | null | undefined,
      options?: {
        decimals?: number; // Số chữ số thập phân (mặc định: 3)
        separator?: string; // Ký tự phân cách hàng nghìn (mặc định: ',')
        decimalSeparator?: string; // Ký tự phân cách thập phân (mặc định: '.')
        showZeroDecimals?: boolean; // Hiển thị số 0 thập phân (mặc định: false)
      }
    ): string => {
      const {
        decimals = 3,
        separator = ',',
        decimalSeparator = '.',
        showZeroDecimals = false
      } = options || {};

      // Xử lý giá trị null/undefined
      if (value === null || value === undefined || value === '') {
        return '0';
      }

      // Convert thành số
      const num = typeof value === 'string' ? parseFloat(value) : value;
      
      // Kiểm tra số hợp lệ
      if (isNaN(num)) {
        return '0';
      }

      // Làm tròn đến số chữ số thập phân cho phép
      const roundedNum = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
      
      // Tách phần nguyên và phần thập phân
      const parts = roundedNum.toString().split('.');
      const integerPart = parts[0];
      let decimalPart = parts[1] || '';

      // Thêm phân cách hàng nghìn cho phần nguyên
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

      // Xử lý phần thập phân
      if (decimalPart || showZeroDecimals) {
        // Padding hoặc cắt bớt đến số chữ số yêu cầu
        if (showZeroDecimals && decimals > 0) {
          decimalPart = decimalPart.padEnd(decimals, '0').substring(0, decimals);
          return `${formattedInteger}${decimalSeparator}${decimalPart}`;
        } else if (decimalPart) {
          // Chỉ hiển thị nếu có phần thập phân
          decimalPart = decimalPart.substring(0, decimals);
          // Loại bỏ số 0 cuối không cần thiết
          decimalPart = decimalPart.replace(/0+$/, '');
          if (decimalPart) {
            return `${formattedInteger}${decimalSeparator}${decimalPart}`;
          }
        }
      }

      return formattedInteger;
    };
  }, []);

  return { formatNumber };
};

/**
 * Utility function để format số (không cần hook)
 */
export const formatNumber = (
  value: number | string | null | undefined,
  options?: {
    decimals?: number;
    separator?: string;
    decimalSeparator?: string;
    showZeroDecimals?: boolean;
  }
): string => {
  const {
    decimals = 3,
    separator = ',',
    decimalSeparator = '.',
    showZeroDecimals = false
  } = options || {};

  if (value === null || value === undefined || value === '') {
    return '0';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return '0';
  }

  const roundedNum = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  const parts = roundedNum.toString().split('.');
  const integerPart = parts[0];
  let decimalPart = parts[1] || '';

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  if (decimalPart || showZeroDecimals) {
    if (showZeroDecimals && decimals > 0) {
      decimalPart = decimalPart.padEnd(decimals, '0').substring(0, decimals);
      return `${formattedInteger}${decimalSeparator}${decimalPart}`;
    } else if (decimalPart) {
      decimalPart = decimalPart.substring(0, decimals);
      decimalPart = decimalPart.replace(/0+$/, '');
      if (decimalPart) {
        return `${formattedInteger}${decimalSeparator}${decimalPart}`;
      }
    }
  }

  return formattedInteger;
};

/**
 * Format số tiền VND
 */
export const formatCurrency = (
  value: number | string | null | undefined,
  suffix: string = ' VND'
): string => {
  return formatNumber(value, { decimals: 0, showZeroDecimals: false }) + suffix;
};

/**
 * Format phần trăm
 */
export const formatPercentage = (
  value: number | string | null | undefined,
  decimals: number = 2
): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value || 0;
  return formatNumber(num, { decimals, showZeroDecimals: false }) + '%';
};