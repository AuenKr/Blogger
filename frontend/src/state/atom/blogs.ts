import { atom } from "recoil";

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

export const blogsAtom = atom<BlogType[]>({
    key: "allBlogs",
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

export interface userBlogType {
    title: string;
    content: string;
    id: string;
    published: boolean,
    createdAt: Date,
    authorId: string
}
export const userBlogsAtom = atom<userBlogType[]>({
    key: "userBlogs",
    default: [{
        "id": "",
        "title": "",
        "content": "",
        "published": false,
        "createdAt": new Date(),
        "authorId" : ""
    }]
})