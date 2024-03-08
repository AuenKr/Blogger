import { useSetRecoilState } from "recoil";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { progressBarAtom } from "../state/atom/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { useEffect } from "react";
import { useIsLogin } from "../hooks/useIsLogin";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const setProgress = useSetRecoilState(progressBarAtom);
    const isLogin = useIsLogin();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin) navigate("/blogs");
        setProgress(100);
    }, []);
    return (
        <>
            <ProgressBar />
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 dark:text-white dark:bg-black">
                <div className="left">
                    <Auth type="signin" />
                </div>
                <div className="right hidden lg:block">
                    <Quote />
                </div>
            </div>
        </>
    );
};
