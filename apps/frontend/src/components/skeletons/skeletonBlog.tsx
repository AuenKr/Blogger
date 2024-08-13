import { SkeletonAuthorBlog } from "./skeletonAuthorBlog";
import { SkeletonBlogContent } from "./skeletonBlogContent";

export const SkeletonBlog = () => {
    return (
        <div className="flex flex-col items-center md:flex-row md:justify-start md:items-start">
            <div className="md:grow-0">
                <SkeletonAuthorBlog />
            </div>
            <div className="w-[100%] md:grow md:px-4">
                <SkeletonBlogContent />
            </div>
        </div>
    );
};
