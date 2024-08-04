import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { VITE_API_URL } = import.meta.env;

const UserInfo = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      {authUser && (
        <div className="flex flex-col items-center text-white font-bold">
          <div className="text-lg">
            <span>{authUser.email}</span>
          </div>
          <div className="text-lg">
            <span>{authUser.username}</span>
          </div>
          {authUser.avatar ? (
            <img
              src={`${VITE_API_URL}/${authUser.avatar}`}
              alt={`${authUser.username}`}
              className="w-24 h-24 rounded-full mt-4"
            />
          ) : (
            <img
              src="../../public/raidManager.png"
              alt="Default avatar"
              className="w-48 h-48 rounded-full mt-4"
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserInfo;
