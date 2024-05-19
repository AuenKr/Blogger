import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/progressBar";
import { ProgressBar } from "../components/ProgressBar";
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useEffect, useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { SkeletonBlogs } from "../components/skeletons/skeletonBlogs";
import { userLogin } from "../hooks/userLogin";
import { NextPageBtn, PreviousPageBtn } from "../components/NavigationBtn";
import { totalBlogAtom } from "../state/blogs";

export default function Blogs() {
    userLogin("#", "/signin");
    const setProgress = useSetRecoilState(progressBarAtom);
    const [page, setPage] = useState(0);
    useEffect(() => {
        setProgress(100);
    }, [page]);
    const noPost = useRecoilValue(totalBlogAtom);
    const { blogs, loading } = useBlogs(page);
    return (
        <>
            <ProgressBar />
            <div className="min-h-screen dark:text-white dark:bg-black flex flex-col">
                <Appbar />
                <div className="space-y-5 mt-4 grid grid-cols-1">
                    {!loading ? (
                        <>
                            {blogs.map((blog) => {
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
                                            publishedAt={blog.createdAt}
                                        />
                                    </div>
                                );
                            })}
                            <div className="flex justify-center space-x-24">
                                <>
                                    <NextPageBtn
                                        currPage={page}
                                        setPage={setPage}
                                        totalPost={noPost || 5}
                                    />
                                    <PreviousPageBtn
                                        currPage={page}
                                        setPage={setPage}
                                        totalPost={noPost || 5}
                                    />
                                </>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                                <SkeletonBlogs key={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
