import { Avatar } from "./Avatar";

export const AuthorBlogPage = ({
    name = "Anonymous",
    email = "",
}: {
    name: string;
    email: string;
}) => {
    return (
        <div className="mb-5 md:col-span-3 font-bold">
            <div className="flex flex-col items-center ">
                <div className="text-2xl font-normal">Author</div>
                <div className="space-y-2">
                    <div className="flex space-x-3 p-2">
                        <Avatar name={name} />
                        <div className="capitalize text-xl">{name}</div>
                    </div>
                    <div>
                        <div className="text-lg">{email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
