import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import Mall from "../pages/Mall/Mall";
import Blog from "../pages/Blog/Blog";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyPage from "../pages/My/MyPage";
import ChallengePage from "../pages/Challenge/ChallengePage";
import Header from "../pages/Layout/Header";

export const ROUTE = {
  HOME: {
    path: "/",
    link: "/",
    element: HomePage,
  },
  MALL: {
    path: "/mall",
    link: "/mall",
    element: Mall,
  },
  BLOG: {
    path: "/blog",
    link: "/blog",
    element: Blog,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    element: Login,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: Register,
  },
  MY: {
    path: "/my",
    link: "/my",
    element: MyPage,
  },
  CHALLENGE: {
    path: "/challenge",
    link: "/challenge",
    element: ChallengePage,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
