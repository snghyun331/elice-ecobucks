import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Mall from "./pages/Mall/Mall";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import My from "./pages/My/My";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mall" element={<Mall />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my" element={<My />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
