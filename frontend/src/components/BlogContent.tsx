export const BlogContent = ({
    title,
    content,
    publishAt = new Date(),
}: {
    title: string;
    content: string;
    publishAt?: Date;
}) => {
    const date = new Date(publishAt);
    return (
        <div className="space-y-2 flex flex-col items-center md:px-4">
            <div className="text-center md:text-left w-[100%] mb-2">
                <div className="text-4xl font-bold">{title}</div>
                <div className="text-lg text-slate-700 dark:text-slate-400">
                    Posted on
                    {` ${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()} `}
                </div>
            </div>
            <div className="truncate text-justify text-lg w-[100%]">
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </div>
    );
};
