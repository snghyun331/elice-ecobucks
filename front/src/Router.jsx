import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Mall from "./pages/Mall/Mall";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mall" element={<Mall />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
