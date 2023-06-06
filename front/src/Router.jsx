import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Mall from "./pages/Mall/Mall";
import Blog from "./pages/Blog/Blog";
import BlogPost from "./pages/Blog/BlogPost";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyPage from "./pages/My/MyPage";
import ChallengePage from "./pages/Challenge/ChallengePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mall" element={<Mall />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/write" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
