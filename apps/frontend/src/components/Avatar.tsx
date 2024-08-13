export const Avatar = ({ name = "" }: AvatarProps) => {
    return (
        <div
            className={
                "size-7 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            }
        >
            <span className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
                {name[0].toUpperCase()}
            </span>
        </div>
    );
};

interface AvatarProps {
    name: string;
}
