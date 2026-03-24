/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from './axiosClient';

export const apiGet = async (url: string, params = {}, config = {}) => {
  try {
    const response = await axiosClient.getInstance().get(url, {
      ...config,
      params, // Axios sẽ tự động convert object params thành query string
    });
    return response.data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export const apiGetRaw = async (url: string, params = {}, config = {}) => {
  try {
    const response = await axiosClient.getInstance().get(url, {
      ...config,
      params, // Axios sẽ tự động convert object params thành query string
    });
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export const apiPost = async (url: string, data: unknown, config = {}) => {
  try {
    const response = await axiosClient.getInstance().post(url, data, config);
    if (response?.data) {
      return response.data;
    }
  } catch (error: any) {
    
    if (error.response) {
      // Lỗi từ phía server (response status 4xx hoặc 5xx)
      console.error("API POST Error - Response:", error.response);
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // Request đã gửi nhưng không nhận được response
      console.error("API POST Error - Request:", error.request);
    } else {
      // Lỗi xảy ra khi setting request
      console.error("API POST Error - Message:", error.message);
    }
    throw error;
  }
};