import axiosInstanceBackend from "@/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const fetchUser = async (email: string): Promise<string> => {
  try {
    const response = await axiosInstanceBackend.get(
      `/profile/getProfileByEmail/${email}`
    );

    return JSON.stringify(response.data.user);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
      return error.response?.data.message;
    }

    if (error instanceof Error) {
      console.log(error.message);
      toast.error(error.message);
      return error.message;
    }

    return "error";
  }
};

export default fetchUser;
