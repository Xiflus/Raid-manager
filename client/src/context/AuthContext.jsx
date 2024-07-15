/* eslint-disable no-unused-vars */
import { useEffect,createContext,useState } from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types"
import toast from "react-hot-toast";
import { getPrivateProfileService,singUpService } from "../../services/userService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const navigate = useNavigate();

    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken') || null); 
    const [authUser,setAuthUser] = useState(null);

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const user = await getPrivateProfileService(authToken);
                setAuthUser(user);
            } catch (err) {
                toast.error(err.message)
            }
        };
        if (authToken) fetchUser();
    },[authToken])
    const authRegister = async (username,email,password)=>{
        try {
            const message = await singUpService(username,email,password);
        } catch (err) {
           toast.error(err.message) 
        }
    }
    return <AuthContext.Provider value={{authRegister,authToken,authUser}}>
        {children}
        </AuthContext.Provider>
}

AuthProvider.propTypes = {
    children:PropTypes.node.isRequired
}

