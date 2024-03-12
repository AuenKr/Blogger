import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../hooks/userLogin";

export default function Home() {
    userLogin('/blogs', "#")
    const setProgress = useSetRecoilState(progressBarAtom);
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/signin')
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
}
