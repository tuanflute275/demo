import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { env } from '@/config/env';
import { HTTP_STATUS, REQUEST_TIMEOUT, ERROR_MESSAGES } from './constants';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/constants';
import { toast } from 'react-toastify';

// Base API Response Interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// API Error Interface
export interface ApiError {
  message: string;
  status?: number;
  errors?: string[];
}

class AxiosClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: env.API_BASE_URL,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY),
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        // if (env.isDevelopment && env.ENABLE_DEBUG) {
        // }

        return response;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    const apiError: ApiError = {
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
    };

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      apiError.status = status;

      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          apiError.message = (data as { message?: string })?.message || 'Dữ liệu không hợp lệ';
          apiError.errors = (data as { errors?: string[] })?.errors;
          break;
        case HTTP_STATUS.UNAUTHORIZED:
          apiError.message = ERROR_MESSAGES.UNAUTHORIZED;
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          // Clear token and redirect to login
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          setTimeout(() => {
          window.location.href = '/login';
          }, 1500);
          break;
        case HTTP_STATUS.FORBIDDEN:
          apiError.message = ERROR_MESSAGES.FORBIDDEN;
          break;
        case HTTP_STATUS.NOT_FOUND:
          apiError.message = ERROR_MESSAGES.NOT_FOUND;
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          apiError.message = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          apiError.message = (data as { message?: string })?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    } else if (error.request) {
      // Network error
      apiError.message = ERROR_MESSAGES.NETWORK_ERROR;
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      apiError.message = ERROR_MESSAGES.TIMEOUT_ERROR;
    }

    // Log error in development
    if (env.isDevelopment) {
      console.error('❌ API Error:', apiError);
    }

    return Promise.reject(apiError);
  }

  // HTTP Methods
  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get(url, config).then(response => response.data);
  }

  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config).then(response => response.data);
  }

  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config).then(response => response.data);
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.patch(url, data, config).then(response => response.data);
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config).then(response => response.data);
  }

  // File Upload
  public upload<T = unknown>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    }).then(response => response.data);
  }

  // Download File
  public download(url: string, filename?: string): Promise<void> {
    return this.instance.get(url, {
      responseType: 'blob',
    }).then(response => {
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    });
  }

  // Get raw axios instance for advanced usage
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const axiosClient = new AxiosClient();
export default axiosClient;