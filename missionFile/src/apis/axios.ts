import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지
let refreshPromise: Promise<string> | null = null;

// localStorage에서 토큰 가져오기
const getAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
const getRefreshToken = () => localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
const setAccessToken = (token: string) => localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
const setRefreshToken = (token: string) => localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
const removeAccessToken = () => localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
const removeRefreshToken = () => localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

export const axiosInstance = axios.create({
  baseURL: "https://umc-web.kyeoungwoon.kr/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // refresh 요청 자체가 401이면 로그아웃
      if (originalRequest.url === "/v1/auth/refresh") {
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = getRefreshToken();
          if (!refreshToken) throw new Error("Refresh Token 없음");

          const { data } = await axiosInstance.post("/v1/auth/refresh", { refresh: refreshToken });

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((err) => {
            removeAccessToken();
            removeRefreshToken();
            throw err;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosInstance.request(originalRequest);
    }

    return Promise.reject(error);
  }
);
