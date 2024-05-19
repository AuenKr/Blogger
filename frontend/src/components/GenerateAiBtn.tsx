import { useRef, useState } from "react";
import { ButtonSCN } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { editorContentAtom, editorTitleAtom } from "../state/editorContent";
import { LoaderCircle } from "lucide-react";

export function GenerateAiBtn() {
    const [loading, setLoading] = useState(false);
    const setTitle = useSetRecoilState(editorTitleAtom);
    const setContent = useSetRecoilState(editorContentAtom);
    // @ts-ignore
    const contextInput = useRef<HTMLTextAreaElement>("");
    const generateBlog = async () => {
        setLoading(true);
        axios
            .post(
                `${BACKEND_URL}/api/v1/ai/generate`,
                {
                    currMessage: contextInput.current.value,
                },
                {
                    headers: {
                        authorization: localStorage.getItem("authorization"),
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setTitle(response.data.blog.title);
                setContent(response.data.blog.content);
            })
            .catch((error) => {
                console.log("errot occur :", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Dialog>
            <DialogTrigger>
                <ButtonSCN
                    className={
                        "w-[150px] h-[60px] rounded-full font-bold " +
                        (loading ? "bg-green-500" : "")
                    }
                >
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <>Ask AI✨</>
                    )}
                </ButtonSCN>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate with Ai ✨</DialogTitle>
                    <DialogDescription>
                        Write down short brief of your blog topic
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col text-left space-y-2">
                    <Label htmlFor="name">Topic</Label>
                    <textarea
                        ref={contextInput}
                        className="rounded-sm p-2 h-44 dark:bg-slate-200 dark:text-black"
                        placeholder="Blog about internet importance"
                        onChange={(e) => {
                            contextInput.current.value = e.target.value;
                        }}
                    ></textarea>
                </div>
                <DialogFooter>
                    <DialogClose
                        asChild
                        className="bg-green-500 w-full"
                        onClick={generateBlog}
                    >
                        <ButtonSCN>Generate</ButtonSCN>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
