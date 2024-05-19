import { useRecoilState, useSetRecoilState } from "recoil";
import { userLogin } from "../hooks/userLogin";
import { progressBarAtom } from "../state/progressBar";
import { editorContentAtom, editorTitleAtom } from "../state/editorContent";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { TextEditor } from "../components/Editor/TextEditor";
import { Button } from "../components/Button";
import { useBlog } from "../hooks/useBlog";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function EditBlog() {
    userLogin("#", "/signin");
    const setProgress = useSetRecoilState(progressBarAtom);
    const [editorContent, setEditorContent] = useRecoilState(editorContentAtom);
    const navigate = useNavigate();
    const { id } = useParams();
    const { blog } = useBlog(id as string);
    const [title, setTitle] = useRecoilState(editorTitleAtom);
    useEffect(() => {
        setProgress(100);
        setEditorContent(blog.content);
        setTitle(blog.title);
    }, [blog]);

    const onClick = () => {
        setProgress(40);
        setTimeout(() => setProgress(80), 300);
        axios
            .put(
                `${BACKEND_URL}/api/v1/blog/`,
                {
                    id,
                    title,
                    content: editorContent,
                    published: true,
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
                setEditorContent("");
                setProgress(100);
                navigate(`/blog/${id}`);
            });
    };
    return (
        <div className="dark:text-white dark:bg-black min-h-screen flex flex-col items-center">
            <Appbar />
            <div className="m-1 text-xl md:2xl max-w-5xl">
                <div className="flex-col justify-center items-center">
                    <div className="w-full">
                        <input
                            type="text"
                            className="text-center grow bg-gray-50 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={title}
                            placeholder="Set Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="text-black min-w-full">
                        <TextEditor/>
                    </div>
                    <div className="">
                        <Button label="Save" onClick={onClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}
