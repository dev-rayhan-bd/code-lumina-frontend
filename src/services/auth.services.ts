/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";

export const authService = {
  register: (data: FormData) => axiosInstance.post("/auth/register", data),
  verifyOtp: (data: { email: string; otp: string }) => axiosInstance.post("/auth/regOtpVerify", data),
  login: (data: any) => axiosInstance.post("/auth/login", data),
  forgotPassword: (email: string) => axiosInstance.post("/auth/forgotPass", { email }),
  resetPassword: (data: any) => axiosInstance.post("/auth/resetPass", data),
};