import { useRecoilState } from "recoil"
import { login } from "../state/login";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useIsLogin = () => {
    const [islogin, setIsLogin] = useRecoilState(login);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: localStorage.getItem("authorization"),
            }
        })
            .then((response) => {
                if (response.data.userId) setIsLogin(true);
            })
            .catch((err) => {
                setIsLogin(false);
            })
    }, [login])
    return islogin;
}