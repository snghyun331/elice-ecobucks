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
      <DispatchContext.Provider value={dispatch}>
        <UserStateContext.Provider value={userState}>
          <Layout />
        </UserStateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}

export default App;
