import { TextEditor } from "../components/Editor/TextEditor";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editorContentAtom } from "../state/atom/editorContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { progressBarAtom } from "../state/atom/progressBar";
import { useNavigate } from "react-router-dom";
import { useIsLogin } from "../hooks/useIsLogin";

export const CreateBlog = () => {
    const setProgress = useSetRecoilState(progressBarAtom);
    const isLogin = useIsLogin();
    const navigate = useNavigate();
    const content = useRecoilValue(editorContentAtom);
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!isLogin) navigate("/signin");
        setProgress(100);
    }, []);
    const onClick = () => {
        setProgress(40);
        setTimeout(() => setProgress(80), 300);
        axios
            .post(
                `${BACKEND_URL}/api/v1/blog/`,
                {
                    title,
                    content,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("authorization"),
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const id = response.data.data.id;
                setProgress(100);
                navigate(`/blog/${id}`);
            });
    };
    return (
        <div className="dark:text-white dark:bg-black min-h-screen flex flex-col items-center">
            <Appbar />
            <div className="m-1 text-xl md:2xl max-w-5xl">
                <div className="flex-col justify-center items-center">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2">
                        <label
                            htmlFor="title"
                            className="grow-0 text-center font-bold"
                        >
                            Set Title:{" "}
                        </label>
                        <input
                            type="text"
                            className="text-base grow bg-gray-50 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="text-black min-w-full">
                        <TextEditor placeholder={"Start typings...."} />
                    </div>
                    <div className="">
                        <Button label="Publish" onClick={onClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};
