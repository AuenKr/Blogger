import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { SkeletonBlogs } from "../components/skeletons/skeletonBlogs";
import { useNavigate } from "react-router-dom";
import { useIsLogin } from "../hooks/useIsLogin";

export const Blogs = () => {
    const setProgress = useSetRecoilState(progressBarAtom);
    const isLogin = useIsLogin();
    const navigate = useNavigate();
    const { blogs, loading } = useBlogs();
    useEffect(() => {
        if (!isLogin) navigate("/signin");
        setProgress(100);
    }, []);
    return (
        <>
            <ProgressBar />
            <div className="min-h-screen dark:text-white dark:bg-black flex flex-col">
                <Appbar />
                <div className="space-y-5 mt-4 grid grid-cols-1">
                    {!loading ? (
                        blogs.map((blog) => {
                            return (
                                <div
                                    key={blog.id}
                                    className="flex justify-center"
                                >
                                    <BlogCard
                                        blogId={blog.id}
                                        author={blog.author.name}
                                        title={blog.title}
                                        content={blog.content}
                                        publishedAt={new Date()}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                                <SkeletonBlogs key={idx}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
