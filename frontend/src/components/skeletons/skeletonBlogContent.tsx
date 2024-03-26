export const SkeletonBlogContent = () => {
    return (
        <div className="space-y-2 w-[100%] md:w-[450px] lg:w-[768px]">
            <div className="w-[100%] flex flex-col items-center md:items-start">
                <div className="h-6 w-11/12 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
                <div className="flex justify-center">
                    <div className="h-4 w-48 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </div>
            </div>
            <div className="w-[100%] flex flex-col items-center md:space-y-2 md:items-start">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (id) => (
                        <div
                            key={id}
                            className="h-4 w-11/12 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                        ></div>
                    )
                )}
            </div>
        </div>
    );
};
