import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Loader } from "./components/Loader";
import Home from "./pages/Home";
const Signin = lazy(() => import("./pages/Signin"));
const EditBlog = lazy(() => import("./pages/EditBlog"));
const UserBlogs = lazy(() => import("./pages/UserBlogs"));
const Blog = lazy(() => import("./pages/Blog"));
const Signup = lazy(() => import("./pages/Signup"));
const Blogs = lazy(() => import("./pages/Blogs"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RecoilRoot>
                <BrowserRouter>
                    <Suspense fallback={<Loader />}>
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
                                path="/blog/edit/:id"
                                element={<EditBlog />}
                                errorElement={<ErrorPage />}
                            />
                            <Route
                                path="/blogs"
                                element={<Blogs />}
                                errorElement={<ErrorPage />}
                            />
                            <Route
                                path="/blog/user/"
                                element={<UserBlogs />}
                                errorElement={<ErrorPage />}
                            />
                            <Route
                                path="/blog/:id"
                                element={<Blog />}
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
        </ThemeProvider>
    );
}
