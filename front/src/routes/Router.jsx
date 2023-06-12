import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_ARR } from "./routes";

// import HomePage from "../pages/HomePage/HomePage";
// import Mall from "../pages/Mall/Mall";
// import Blog from "../pages/Blog/Blog";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import MyPage from "../pages/My/MyPage";
// import ChallengePage from "../pages/Challenge/ChallengePage";
import Header from "../pages/Layout/Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {ROUTE_ARR.map((route, index) => {
          return (
            <Route path={route.path} element={<route.element />} key={index} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
