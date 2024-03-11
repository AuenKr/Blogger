import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
const Blog = lazy(() => import("./pages/Blog"));
const Signup = lazy(() => import("./pages/Signup"));
const Blogs = lazy(() => import("./pages/Blogs"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));

export default function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Suspense fallback={<div>Loading....</div>}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path="/signin"
                            element={<Signin />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path="/signup"
                            element={<Signup />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path="/blog/:id"
                            element={<Blog />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path="/blogs"
                            element={<Blogs />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path="/create"
                            element={<CreateBlog />}
                            errorElement={<ErrorPage />}
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </RecoilRoot>
    );
}
