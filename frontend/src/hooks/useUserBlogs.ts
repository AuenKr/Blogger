import { useRecoilState } from "recoil"
import { userBlogsAtom } from "../state/atom/blogs"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useUserBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useRecoilState(userBlogsAtom);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/me`,
            {
                headers: {
                    'authorization': localStorage.getItem('authorization')
                }
            }).then((response) => {
                setBlogs(response.data.blogs)
                setLoading(false)
                console.log(blogs)
            })
    }, [])
    return {
        loading,
        blogs
    }
}
