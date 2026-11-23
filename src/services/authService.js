import api from "./api";
import { AUTH_ENDPOINTS } from "./apiConfig";

const authService = {
  register: (data) => api.post(AUTH_ENDPOINTS.register, data),
  verifyOtp: (data) => api.post(AUTH_ENDPOINTS.otpVerify, data),
  login: (data) => api.post(AUTH_ENDPOINTS.login, data),
  refreshToken: (refresh) =>
    api.post(AUTH_ENDPOINTS.tokenRefresh, { refresh }),
};

export default authService;
