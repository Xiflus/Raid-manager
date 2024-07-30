import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const {VITE_API_URL} = import.meta.env;

const UserInfo = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      {authUser && (
        <div>
            <div>
                <span>
                    {authUser.email}
                </span>
            </div>
          <div>
            <span>{authUser.username}</span>
          </div>
          {authUser.avatar ? (
            <img
              src={`${VITE_API_URL}/${authUser.avatar}`}
              alt={`${authUser.username}`}
            />
          ) : (
            <img src="../../public/raidManager.png" alt="Default avatar" />
          )}
        </div>
      )}
    </>
  );
};

export default UserInfo;