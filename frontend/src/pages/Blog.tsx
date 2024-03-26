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
import { userLogin } from "../hooks/userLogin";
import { Button } from "../components/Button";
import { useUserDetail } from "../hooks/useUserDetail";

export default function Blog() {
    userLogin("#", "/signin");
    const setProgress = useSetRecoilState(progressBarAtom);
    const navigate = useNavigate();
    const userDetail = useUserDetail();
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
                                            publishAt={blog.createdAt}
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                {userDetail.email === blog.author.email ? (
                                    <Button
                                        label="Edit"
                                        onClick={() => {
                                            setProgress(70);
                                            navigate(`/blog/edit/${id}`);
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
