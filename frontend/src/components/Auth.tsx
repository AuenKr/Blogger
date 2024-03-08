import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { AuthHeader } from "./AuthHeader";
import { Input } from "./Input";
import { useSetRecoilState } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";
import { Button } from "./Button";

export const Auth = ({ type }: AuthInputType) => {
    const [postInputs, setPostInputs] = useState({});
    const setProgress = useSetRecoilState(progressBarAtom);
    const navigate = useNavigate();

    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setPostInputs((c) => ({
            ...c,
            [evt.target.name]: evt.target.value,
        }));
    };
    const onSubmit = async (evt: ChangeEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setProgress(60);
        axios
            .post(
                `${BACKEND_URL}/api/v1/user/${
                    type === "signup" ? "signup" : "signin"
                }`,
                postInputs,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const data: AuthOutputType = response.data;
                localStorage.setItem("authorization", data.authorization);
                navigate("/blogs");
            });
    };
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div>
                <AuthHeader type={type} />
            </div>
            <form className="flex flex-col w-10/12 max-w-lg space-y-2 pt-5">
                {type === "signup" ? (
                    <Input
                        type={"text"}
                        label={"name"}
                        placeholder={"Enter your name"}
                        onChange={onChangeHandler}
                    />
                ) : null}
                <Input
                    type={"email"}
                    label={"email"}
                    placeholder={"Enter your email"}
                    onChange={onChangeHandler}
                />
                <Input
                    type={"password"}
                    label={"password"}
                    placeholder={"Enter your password"}
                    onChange={onChangeHandler}
                />
                <div className="flex justify-center ">
                    <Button
                        label={type === "signup" ? "SignUp" : "SignIn"}
                        // @ts-ignore
                        onClick={onSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export interface AuthInputType {
    type: "signin" | "signup";
}

export interface AuthOutputType {
    msg: string;
    authorization: string;
}
