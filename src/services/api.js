import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "./apiConfig";

const api = axios.create({
    baseURL: API_BASE_URL,
});

let refreshPromise = null;

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        const isAuthRequest = Object.values(AUTH_ENDPOINTS).some((endpoint) =>
            config.url?.endsWith(endpoint)
        );

        if (token && !isAuthRequest) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;
        const isAuthRequest = Object.values(AUTH_ENDPOINTS).some((endpoint) =>
            request?.url?.endsWith(endpoint)
        );

        if (error.response?.status !== 401 || !request || isAuthRequest) {
            return Promise.reject(error);
        }

        const clearSession = () => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");
        };

        const redirectToSignIn = () => {
            clearSession();
            window.location.href = "/signin";
        };

        if (request._retry) {
            redirectToSignIn();
            return Promise.reject(error);
        }

        const currentAccess = localStorage.getItem("access");
        if (
            currentAccess &&
            request.headers?.Authorization !== `Bearer ${currentAccess}`
        ) {
            request._retry = true;
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${currentAccess}`;
            return api(request);
        }

        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
            redirectToSignIn();
            return Promise.reject(error);
        }

        request._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = axios
                    .post(`${API_BASE_URL}${AUTH_ENDPOINTS.tokenRefresh}`, {
                        refresh,
                    })
                    .then(({ data }) => {
                        if (!data.access) {
                            throw new Error(
                                "Token refresh response did not include an access token."
                            );
                        }

                        localStorage.setItem("access", data.access);

                        if (data.refresh) {
                            localStorage.setItem("refresh", data.refresh);
                        }

                        return data.access;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            const access = await refreshPromise;
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${access}`;

            return api(request);
        } catch (refreshError) {
            console.error(
                "Access token refresh failed:",
                refreshError.response?.data || refreshError.message
            );
            redirectToSignIn();
            return Promise.reject(refreshError);
        }
    }
);

export default api;