import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/progressBar";
import { useUserDetail } from "../hooks/useUserDetail";
import { ModeToggle } from "./mode-toggle";

export const Appbar = () => {
    const navigate = useNavigate();
    const userDetail = useUserDetail();
    const setProgress = useSetRecoilState(progressBarAtom);

    const avatarOnClickHandler = () => {
        setProgress(40);
        navigate("/blog/user");
    };
    return (
        <div className="w-full px-2 lg:px-56 flex justify-between sticky top-0 z-10 bg-white border-b-2 border-slate-500 dark:bg-black">
            <Link to="/blogs" className="flex items-center">
                <img src="/blogger1.png" alt="Blogger" className="h-12" />
                <span className="hidden sm:block">Blogger</span>
            </Link>

            <div className="flex items-center space-x-4">
                <div className="flex space-x-3 text-sm font-bold justify-center items-center">
                    <Button
                        label="NewBlog"
                        onClick={() => {
                            setProgress(70);
                            navigate("/create");
                        }}
                    />
                    <Button
                        label="SignOut"
                        onClick={() => {
                            setProgress(80);
                            localStorage.clear();
                            navigate("/signin");
                        }}
                    />
                    <div>
                        <ModeToggle />
                    </div>
                </div>
                <div
                    className="hover:cursor-pointer"
                    onClick={avatarOnClickHandler}
                >
                    <Avatar name={userDetail.name} />
                </div>
            </div>
        </div>
    );
};
