// import axios from "axios";
import {
    authenticatedAxiosInstance,
    unauthenticatedAxiosInstance,
} from "../api/config";

import { saveDataToLocalStorage } from "../utils/LocalStorage";

import { jwtDecode } from "jwt-decode";


const isAccessTokenExpired = (accessToken) => {
    if (!accessToken) return true;
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await unauthenticatedAxiosInstance.post(
            "/auth/token",
            {
                token: refreshToken,
            }
        );

        console.log(response.status);

        let newAccessToken = null;

        if (response.status === 201) {
            newAccessToken = response.data.accessToken;
            // setAccessTokenHeader(newAccessToken);
            saveDataToLocalStorage("accessToken", newAccessToken);
        }
        return newAccessToken;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("the refresh token sent in the post request is not valid");
        } else if (error.response && error.response.status === 403) {
            console.log(
                "most likely the server restarted or refresh token is not valid"
            );
        } else {
            console.error(error);
        }
        console.error("Error refreshing accessToken:", error);
        return null;
    }
};

export { isAccessTokenExpired, refreshAccessToken };

