export const SkeletonBlogs = () => {
    return (
        <div
            role="status"
            className="w-10/12 pb-2 text-sm max-w-4xl space-y-2 animate-pulse"
        >
            <div className="flex items-center space-y-3">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            </div>

            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-3"></div>
        </div>
    );
};
