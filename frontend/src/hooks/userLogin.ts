import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";

export const userLogin = (successRedirect: string, failRedirect: string) => {
    const navigate = useNavigate();
    const setProgress = useSetRecoilState(progressBarAtom);

    if (!localStorage.getItem("authorization") && failRedirect !== "#") navigate("/signin");
    useEffect(() => {
        setProgress(70);
        axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: localStorage.getItem("authorization"),
            }
        })
            .then(() => {
                navigate(successRedirect);
            })
            // @ts-ignore
            .catch((err) => {
                if (failRedirect !== "#") navigate(failRedirect);
                console.error(err);
            })
    }, [])
}