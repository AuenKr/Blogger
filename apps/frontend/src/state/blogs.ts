import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../config";

export const blogsAtom = atom<BlogType[]>({
    key: "currBlogs",
    default: [{
        "id": "",
        "title": "",
        "content": "",
        "published": false,
        "createdAt": new Date(),
        "author": {
            "name": "",
            "email": ""
        }
    }]
})

export const userBlogsAtom = atom<userBlogType[]>({
    key: "userBlogs",
    default: [{
        "id": "",
        "title": "",
        "content": "",
        "published": false,
        "createdAt": null,
        "authorId": ""
    }]
})

const totalBlogsSelector = selector<number>({
    key: "totalBlogsSelector",
    get: async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/totalPost`, {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        })
        return response.data.totalPost
    }
})

export const totalBlogAtom = atom({
    key: "totalBlogAtom",
    default: totalBlogsSelector
})

export interface BlogType {
    title: string;
    content: string;
    id: string;
    published: boolean,
    createdAt: Date,
    author: {
        name: string
        email: string
    }
}

export interface userBlogType {
    title: string;
    content: string;
    id: string;
    published: boolean,
    createdAt: Date | null,
    authorId: string,
}