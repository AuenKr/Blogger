import { useRecoilState } from "recoil"
import { blogsAtom } from "../state/blogs"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlogs = (page: number = 0) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useRecoilState(blogsAtom);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}`,
            {
                headers: {
                    'authorization': localStorage.getItem('authorization')
                }

            }).then((response) => {
                setBlogs(response.data.blogs)
                setLoading(false)
                return;
            })
    }, [page])
    return {
        loading,
        blogs
    }
}
