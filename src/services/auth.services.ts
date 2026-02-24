/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/lib/axios";

export const authService = {
  login: (data: any) => axiosInstance.post("/auth/login", data),
  
  register: (data: FormData) => axiosInstance.post("/auth/register", data),
  
  verifyRegOtp: (data: { email: string; otp: string }) => 
    axiosInstance.post("/auth/regOtpVerify", data),
  
  resendOtp: (email: string) => 
    axiosInstance.post("/auth/resendOtp", { email }),
    
  forgotPassword: (email: string) => 
    axiosInstance.post("/auth/forgotPass", { email }),
    
  verifyForgotOtp: (data: { email: string; otp: string }) => 
    axiosInstance.post("/auth/verifyOtp", data),
    
  resetPassword: (data: any) => 
    axiosInstance.post("/auth/resetPass", data),
};