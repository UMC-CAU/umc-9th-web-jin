import type { RequestSigninDto, RequestSignupDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import axiosInstance from "./axios";
import axios from "axios";

export const postSignup = async (body: RequestSignupDto):Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);

return data; 
};

export const postSignin = async (body: RequestSigninDto):Promise<ResponseSigninDto>=> {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);

return data; 
};

export const getMyInfo = async () => {
    const token = localStorage.getItem("accessToken");
    return axios.get("https://umc-web.kyeoungwoon.kr/v1/users/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.data);
};