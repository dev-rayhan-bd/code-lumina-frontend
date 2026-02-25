import axiosInstance from "@/lib/axios";

export const userService = {
  getMyProfile: async () => {
    const res = await axiosInstance.get("/user/my-profile");
    return res.data.data;
  },
  updateProfile: async (data: FormData) => {
    return await axiosInstance.patch("/user/edit-profile", data);
  }
};