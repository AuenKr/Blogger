import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";

export const BlogCard = ({
    blogId,
    author,
    title,
    content,
    publishedAt = new Date(),
}: BlogCardProps) => {
    const setProgress = useSetRecoilState(progressBarAtom);
    const navigate = useNavigate();
    const onClick = () => {
        setProgress(60);
        navigate(`/blog/${blogId}`);
    };
    return (
        <div
            className="w-11/12 pb-2 text-sm lg:text-lg border-b-2 border-slate-500 max-w-4xl space-y-1"
            onClick={onClick}
        >
            <div className="flex items-center space-x-3 text-base lg:text-xs text-slate-700 dark:text-slate-300">
                <Avatar name={author} />
                <div className="font-base lg:font-medium">{author}</div>
                <div className="w-1 h-1 lg:w-2 lg:h-2 rounded-full bg-slate-800 dark:bg-white"></div>
                <div className="font-medium lg:font-semibold">{`${publishedAt.getDate()} / ${publishedAt.getMonth()} / ${publishedAt.getFullYear()}`}</div>
            </div>
            <div className="hover:cursor-pointer space-y-1">
                <div className="text-lg font-semibold lg:font-bold lg:text-2xl">
                    {title}
                </div>
                <div className="lg:text-base line-clamp-1 lg:line-clamp-2">
                    {<div dangerouslySetInnerHTML={{ __html: content }} />}
                </div>
            </div>
        </div>
    );
};

interface BlogCardProps {
    blogId: string;
    author: string;
    title: string;
    content: string;
    publishedAt?: Date;
}
