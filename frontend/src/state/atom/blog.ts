import { atom } from "recoil";
import { BlogType } from "./blogs";

export const blogAtom = atom<BlogType>({
    key: "BlogAtom",
    default: {
        title: "",
        content: "",
        id: "",
        published: false,
        createdAt: new Date(),
        author: {
            name: "",
            email: "",
        }
    }
})