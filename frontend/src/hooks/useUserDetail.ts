import { useRecoilState } from "recoil"
import { userAtom } from "../state/atom/userDetail"
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useUserDetail = () => {
    const [userDetail, setUserDetail] = useRecoilState(userAtom);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        }).then((response) => {
            setUserDetail(response.data.userId)
        })
    }, [])
    return userDetail;
}