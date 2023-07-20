import axiosInstanceBackend from "@/axios";
import { AxiosError } from "axios";

const checkUsernameExists = async (email: string): Promise<string> => {
  try {
    const response = await axiosInstanceBackend.get(
      `/profile/getProfileByEmail/${email}`
    );

    if (response.data.username) {
      return "username is already set";
    }
    return "username is not set";
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "";
  }
};

export default checkUsernameExists;
