import fetchUser from "./fetchUser";

const useUser = async (email: string): Promise<UserModelResponse> => {
  let user: UserModelResponse = {
    _id: "",
    username: "",
    email: "",
    followers: [""],
    following: [""],
  };

  if (!email) return user;
  if (email && !localStorage.getItem("user")) {
    const response = await fetchUser(email);
    console.log(response)
    localStorage.setItem("user", response);
  }
  user = JSON.parse(localStorage.getItem("user")!) as UserModelResponse;

  return user;
};

export default useUser;
