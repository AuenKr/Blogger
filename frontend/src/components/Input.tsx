import { ChangeEvent } from "react";

export const Input = ({ label, type, placeholder, onChange }: InputBoxType) => {
    return (
        <div className="capitalize">
            <label
                htmlFor={label}
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                type={type}
                name={label}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
                onChange={onChange}
            />
        </div>
    );
};

interface InputBoxType {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
