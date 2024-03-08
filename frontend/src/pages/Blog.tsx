import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { AuthorBlogPage } from "../components/AuthorBlogPage";
import { BlogContent } from "../components/BlogContent";
import { SkeletonBlog } from "../components/skeletons/skeletonBlog";
import { useIsLogin } from "../hooks/useIsLogin";

export const Blog = () => {
    const setProgress = useSetRecoilState(progressBarAtom);
    const isLogin = useIsLogin();
    const navigate = useNavigate();
    const { id } = useParams();
    const { blog, loading } = useBlog(id as string);
    useEffect(() => {
        if (!isLogin) navigate("/signin");
        setProgress(100);
    }, []);
    return (
        <>
            <div className="min-h-screen dark:bg-black dark:text-white">
                <ProgressBar />
                <Appbar />
                <div>
                    <div className="flex justify-center mt-10">
                        <div className="grid grid-cols-12 px-2 max-w-screen-lg">
                            {loading ? (
                                <div className="col-span-12">
                                    <SkeletonBlog />
                                </div>
                            ) : (
                                <>
                                    <div className="col-span-12 md:col-span-4">
                                        <AuthorBlogPage
                                            name={blog.author.name}
                                            email={blog.author.email}
                                        />
                                    </div>

                                    <div className="col-span-12 md:col-span-8">
                                        <BlogContent
                                            title={blog.title}
                                            content={blog.content}
                                            // publishAt={blog.createdAt}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
