import axiosInstanceBackend from "@/axios";
import { AxiosError } from "axios";

const checkUsernameExists = async (email: string): Promise<string> => {
  try {
    const response = await axiosInstanceBackend.get(
      `/profile/getProfileByEmail/${email}`
    );

    if (response.data.username) {
      console.log("5");
      return "username is already set";
    }
    return "username is not set";
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "";
    console.log(error);
  }
};

export default checkUsernameExists;
