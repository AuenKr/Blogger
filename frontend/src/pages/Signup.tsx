import { useSetRecoilState } from "recoil";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { progressBarAtom } from "../state/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { useEffect } from "react";
import { userLogin } from "../hooks/userLogin";

export default function Signup() {
    userLogin("/blogs", "#");
    const setProgress = useSetRecoilState(progressBarAtom);
    useEffect(() => {
        setProgress(100);
    }, []);
    return (
        <>
            <ProgressBar />
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 dark:text-white dark:bg-black">
                <div className="left ">
                    <Auth type="signup" />
                </div>
                <div className="right invisible md:visible">
                    <Quote />
                </div>
            </div>
        </>
    );
};
