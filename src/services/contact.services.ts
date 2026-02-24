import axiosInstance from "@/lib/axios";


export interface ContactMessage {
  subject: string;
  message: string;
}

export const contactService = {

  sendMessage: async (data: ContactMessage) => {
 
    const response = await axiosInstance.post("/contact/send-message", data);
    return response.data;
  },
};