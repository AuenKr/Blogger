import { useRecoilState } from "recoil"
import { blogAtom } from "../state/atom/blog"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlog = (id: string) => {
    const [blog, setBlog] = useRecoilState(blogAtom);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        })
            .then((response) => {
                setBlog(response.data.data)
                setLoading(false)
            })
    }, [id])
    return { blog, loading }
}