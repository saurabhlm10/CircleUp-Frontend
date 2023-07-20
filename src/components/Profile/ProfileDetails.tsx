import axiosInstanceBackend from "@/axios";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

interface ProfileDetailsProps {
  user: UserModelResponse;
  email: string;
  userEmail: string;
  selfProfile: boolean;
  setUser: Dispatch<SetStateAction<UserModelResponse | null>>;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
  user,
  email,
  selfProfile,
  userEmail,
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogout = async () => {
    await signOut();

    localStorage.clear();
  };

  const onFollow = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstanceBackend.put(
        `/follow/addremovefollower/${email}/${userEmail}`
      );

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="font-semibold text-2xl mt-4">{user?.username}</h1>
        <div className="flex flex-row justify-between mt-6">
          <b>{user?.followers?.length} followers</b>
          <b>{user?.following?.length} following</b>
        </div>
      </div>
      {selfProfile ? (
        <button
          className="border-2 border-black px-1 py-0.5 mt-4 w-32 text-lg"
          onClick={onLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className={` ${
            user?.followers?.includes(email!) ? "bg-slate-200" : "bg-blue-200"
          }  px-1 py-0.5 mt-4 w-32 text-lg flex flex-row justify-center items-center h-8`}
          onClick={onFollow}
        >
          {isLoading ? (
            <Oval
              height={20}
              width={20}
              color="#1B98F5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="##3944F7"
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          ) : (
            <div>
              {user?.followers?.includes(email) ? "Following" : "Follow"}
            </div>
          )}
        </button>
      )}
    </>
  );
};

export default ProfileDetails;
