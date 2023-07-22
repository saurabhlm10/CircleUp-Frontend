import { AxiosError } from "axios";
import fetchUser from "./fetchUser";
import toast from "react-hot-toast";

const getUser = async (email: string): Promise<UserModelResponse> => {
  let user: UserModelResponse = {
    _id: "",
    username: "",
    email: "",
    followers: [""],
    following: [""],
  };

  if (!email) return user;
  if (email && !localStorage.getItem("user") || localStorage.getItem('user') === 'Token Missing') {
    try {
      const response = await fetchUser(email);
      console.log(response);
      localStorage.setItem("user", response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
  user = JSON.parse(localStorage.getItem("user")!) as UserModelResponse;

  return user;
};

export default getUser;

// import { useEffect, useState } from "react";
// import fetchUser from "./fetchUser";
// import { AxiosResponse } from "axios";

// const getUser = (email: string): UserModelResponse | null => {
//   const [user, setUser] = useState<UserModelResponse | null>(null);

//   useEffect(() => {
//     const getUser = async () => {
//       let fetchedUser: UserModelResponse | null = null;

//       if (email && !localStorage.getItem("user")) {
//         const response = await fetchUser(email);
//         localStorage.setItem("user", JSON.stringify(response));
//         fetchedUser = JSON.parse(response);
//       } else {
//         fetchedUser = JSON.parse(localStorage.getItem("user")!);
//       }

//       setUser(fetchedUser);
//     };

//     getUser();
//   }, [email]);

//   return user;
// };

// export default getUser;
