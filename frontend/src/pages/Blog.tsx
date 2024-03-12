import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { AuthorBlogPage } from "../components/AuthorBlogPage";
import { BlogContent } from "../components/BlogContent";
import { SkeletonBlog } from "../components/skeletons/skeletonBlog";
import { userLogin } from "../hooks/userLogin";

export default function Blog() {
    userLogin("#", "/signin");
    const setProgress = useSetRecoilState(progressBarAtom);
    const { id } = useParams();
    const { blog, loading } = useBlog(id as string);
    useEffect(() => {
        setProgress(100);
    }, []);
    return (
        <>
            <div className="min-h-screen dark:bg-black dark:text-white">
                <ProgressBar />
                <Appbar />
                <div>
                    <div className="flex justify-center mt-10">
                        <div className="w-svw px-2 max-w-screen-lg md:flex md:justify-between">
                            {loading ? (
                                <div className="w-svg">
                                    <SkeletonBlog />
                                </div>
                            ) : (
                                <>
                                    <div className="grow-0">
                                        <AuthorBlogPage
                                            name={blog.author.name}
                                            email={blog.author.email}
                                        />
                                    </div>

                                    <div className="grow">
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
