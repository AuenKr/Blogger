import { useRecoilState, useSetRecoilState } from "recoil"
import { userBlogsAtom } from "../state/blogs"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { userAtom } from "../state/userDetail";

export const useUserBlogs = (page: number = 0) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useRecoilState(userBlogsAtom);
    const setUserDetail = useSetRecoilState(userAtom);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/me?page=${page}`,
            {
                headers: {
                    'authorization': localStorage.getItem('authorization')
                }
            }).then((response) => {
                setUserDetail(prev => ({ ...prev, noPost: response.data.blogs[0].author.noPost }))
                setBlogs(response.data.blogs)
                setLoading(false)
            })
    }, [page])
    return {
        loading,
        blogs
    }
}
