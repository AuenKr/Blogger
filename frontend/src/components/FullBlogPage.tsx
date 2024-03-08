import { useBlog } from "../hooks/useBlog";
import { AuthorBlogPage } from "./AuthorBlogPage";
import { BlogContent } from "./BlogContent";

export const FullBlogPage = ({ blogID }: { blogID: string }) => {
    const { blog, loading } = useBlog(blogID as string);
    if (loading) return <div>Loading...</div>;
    return (
        <div className="flex justify-center mt-10">
            <div className="grid grid-cols-12 px-2 max-w-screen-lg">
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
                        // publishAt={new Date()}
                    />
                </div>
            </div>
        </div>
    );
};
