import axios from "axios";
import API_URL from "../config/config";

import { isAccessTokenExpired, refreshAccessToken } from "../utils/authUtils";

const unauthenticatedAxiosInstance = axios.create({
    baseURL: API_URL,
});

const authenticatedAxiosInstance = axios.create({
    baseURL: API_URL,
});

authenticatedAxiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        config.headers["Authorization"] = `Bearer ${accessToken}`;

        if (isAccessTokenExpired(accessToken)) {
            const refreshToken = localStorage.getItem("refreshToken");
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken !== null) {
                config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            } else {
                window.location.href = '/signin';
                return Promise.reject("The new access token is invalid.");
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { authenticatedAxiosInstance, unauthenticatedAxiosInstance };
