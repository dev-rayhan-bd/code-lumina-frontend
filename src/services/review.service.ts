/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";

export const reviewService = {

 getHistory: async (isAdminView: boolean, params: Record<string, any>) => {

    const endpoint = isAdminView ? "/review/all-reviews" : "/review/my-history";
    const { data } = await axiosInstance.get(endpoint, { params });
    return data.data;
  },
    getGlobalMetrics: async () => {
    const { data } = await axiosInstance.get("/review/analytics");
    return data.data;
  },
};