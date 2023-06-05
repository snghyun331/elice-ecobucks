import React, { useState, useEffect, useReducer, createContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./pages/Layout/Layout";

import { loginReducer } from "./reducer";
import UserProvider from "./context/user/UserProvider";

function App() {
  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <UserProvider>
      <div className="app"></div>
    </UserProvider>
  );
}

export default App;
