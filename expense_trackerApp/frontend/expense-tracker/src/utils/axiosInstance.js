import axios from "axios"
import { BASE_URI } from "./apiPaths.js"

const axiosInstance = axios.create({
    baseURL: BASE_URI,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle common error globaly
        if(error.response){
            if(error.response.status === 401){
                //Redirecting to Login Page
                window.location.href = "/login";
            }else if(error.response.status === 500){
                 console.error("Server error. please try again later.");
                 
            }
        }else if(error.code === "ECONNABORTED"){
            console.error("Request timeout. Please again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
