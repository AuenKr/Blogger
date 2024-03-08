export const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            type="button"
            className="w-full dark:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

interface ButtonProps {
    label: string;
    onClick: () => void;
}
