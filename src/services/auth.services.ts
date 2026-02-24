/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";

export const authService = {

  login: async (data: any) => {
    return await axiosInstance.post("/auth/login", data);
  },


  register: async (data: FormData) => {
    return await axiosInstance.post("/auth/register", data);
  },


  verifyRegOtp: async (data: { email: string; otp: string }) => {
    return await axiosInstance.post("/auth/regOtpVerify", data);
  },


  resendOtp: async (email: string) => {
    return await axiosInstance.post("/auth/resendOtp", { email });
  },


  forgotPassword: async (email: string) => {
    return await axiosInstance.post("/auth/forgotPass", { email });
  },


  verifyForgotOtp: async (data: { email: string; otp: string }) => {
    return await axiosInstance.post("/auth/verifyOtp", data);
  },


  resetPassword: async (data: any) => {
    return await axiosInstance.post("/auth/resetPass", data);
  },


  logout: async () => {
    const res = await axiosInstance.post("/auth/logout");
    if (res.data.success) {

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return res;
  }
};