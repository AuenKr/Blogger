import { Link } from "react-router-dom";
import { AuthInputType } from "./Auth";

export const AuthHeader = ({ type }: AuthInputType) => {
    return (
        <div className="space-y-1 text-center">
            <div className="text-4xl font-extrabold ">
                {type === "signup"
                    ? " Create an account"
                    : " Welcome to blogger"}
            </div>
            <div className="text-lg text-slate-400 dark:text-white">
                {type === "signup"
                    ? "Already have an account "
                    : "Don't have an account "}
                <Link
                    to={type === "signup" ? "/signin" : "/signup"}
                    className="underline decoration-solid hover:text-black dark:hover:text-slate-400"
                >
                    {type === "signup" ? "SignIn" : "SignUp"}
                </Link>
            </div>
        </div>
    );
};
