import React, { useState, useEffect, useReducer, createContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UserProvider from "./context/user/UserProvider";
import Layout from "./pages/Layout/Layout"

import { loginReducer } from "./reducer";
export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {


  return (
    <>
    <UserProvider>
      <div className="app"><Layout /></div>
    </UserProvider>
    </>
  );
}

export default App;
