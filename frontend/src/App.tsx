import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Signup } from "./pages/Signup";
import { Blogs } from "./pages/Blogs";
import { RecoilRoot } from "recoil";
import { ErrorPage } from "./pages/ErrorPage";
import { CreateBlog } from "./pages/CreateBlog";

export default function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path="/signin"
                        element={<Signin />}
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
            </BrowserRouter>
        </RecoilRoot>
    );
}
