import { FC } from "react";

interface ProfileDetailsProps {}

const ProfileDetails: FC<ProfileDetailsProps> = ({}) => {
  return (
    <div>
      {" "}
      <div>
        <h1 className="font-semibold text-2xl mt-4">{"saurabh25"} </h1>
        <div className="flex flex-row gap-[50px] mt-6">
          {/* {selfProfile ? ( */}
          {true ? (
            <>
              {/* <b>{user?.followers?.length} followers</b>
      <b>{user?.following?.length} following</b> */}
              <b>10 followers </b>
              <b>5 following</b>
            </>
          ) : (
            <>
              <b>10 followers</b>
              <b>5 following</b>
            </>
          )}
        </div>
      </div>
      {true ? (
        // {selfProfile ? (
        <button
          className="border-2 border-black px-1 py-0.5 mt-4 w-32 text-lg"
          // onClick={onLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className={` ${
            // tempUser?.followers?.includes(username)
            true ? "bg-slate-200" : "bg-blue-200"
          }  px-1 py-0.5 mt-4 w-32 text-lg flex flex-row justify-center items-center h-8`}
          // onClick={onFollow}
        >
          {/* {false ? ( */}
          {/* {followLoader ? ( */}
          {true ? (
            <div></div>
          ) : (
            // <Oval
            //   height={20}
            //   width={20}
            //   color="#1B98F5"
            //   wrapperStyle={{}}
            //   wrapperClass=""
            //   visible={true}
            //   ariaLabel="oval-loading"
            //   secondaryColor="##3944F7"
            //   strokeWidth={5}
            //   strokeWidthSecondary={5}
            // />
            // <div>{tempUser?.followers?.includes(username) ? 'Following' : 'Follow'}</div>
            <div>{true ? "Following" : "Follow"}</div>
          )}
        </button>
      )}
    </div>
  );
};

export default ProfileDetails;
