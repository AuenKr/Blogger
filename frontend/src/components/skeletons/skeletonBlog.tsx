import { SkeletonAuthorBlog } from "./skeletonAuthorBlog";
import { SkeletonBlogContent } from "./skeletonBlogContent";

export const SkeletonBlog = () => {
    return (
        <div className="w-screen flex flex-col items-center md:flex-row justify-center">
            <SkeletonAuthorBlog />
            <SkeletonBlogContent />
        </div>
    );
};
