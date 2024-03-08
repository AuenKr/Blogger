import { Appbar } from "../components/Appbar";

export const ErrorPage = () => {
    return (
        <div className="dark:text-white dark:bg-black">
            <Appbar />
            <div>
                Some error occur
            </div>
        </div>
    );
};
