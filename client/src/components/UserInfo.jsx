import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { VITE_API_URL } = import.meta.env;

const UserInfo = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      {authUser && (
        <div className="flex flex-col items-center  font-bold">
          <div className="text-lg bg-gray-800 p-1 rounded-lg shadow-lg mb-2">
            <span className="text-gray-300">{authUser.email}</span>
          </div>
          <div className="text-lg bg-gray-800 p-1 rounded-lg shadow-lg">
            <span className="text-gray-300">{authUser.username}</span>
          </div>
          {authUser.avatar ? (
            <img
              src={`${VITE_API_URL}/${authUser.avatar}`}
              alt={`${authUser.username}`}
              className="size-48 rounded-full mt-1 shadow-orange-semi-transparent"
            />
          ) : (
            <img
              src="../../public/raidManager.png"
              alt="Default avatar"
              className="size-48 rounded-full mt-4 shadow-orange-semi-transparent"
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserInfo;
