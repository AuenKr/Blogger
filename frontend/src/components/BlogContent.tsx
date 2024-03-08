export const BlogContent = ({
    title,
    content,
    publishAt = new Date(),
}: {
    title: string;
    content: string;
    publishAt?: Date;
}) => {
    return (
        <div className="space-y-2">
            <div className="text-4xl font-bold">{title}</div>
            <div className="text-lg text-slate-700 dark:text-slate-400">
                Posted on
                {` ${publishAt.getDate()} / ${publishAt.getMonth()} / ${publishAt.getFullYear()} `}
            </div>
            <div className="truncate text-justify text-lg">{content}</div>
        </div>
    );
};
