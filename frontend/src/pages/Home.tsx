import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLogin } from "../hooks/useIsLogin";

export const Home = () => {
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
            <Appbar />
            <div className="min-h-screen">
                <div>Home</div>
            </div>
        </>
    );
};
