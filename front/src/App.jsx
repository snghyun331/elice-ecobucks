import React, { useState, useEffect, useReducer, createContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UserProvider from "./context/user/UserProvider";
import Layout from "./pages/Layout/Layout"

import UserProvider from "./context/user/UserProvider";
import Layout from "./pages/Layout/Layout"


function App() {
<<<<<<< HEAD
  return (
    <>
      <UserProvider>
        <div className="app"><Layout /></div>
      </UserProvider>
=======


  return (
    <>
    <UserProvider>
      <div className="app"><Layout /></div>
    </UserProvider>
>>>>>>> e45df5ca85dfcb44e5c23a43789d802d9bb2b847
    </>
  );
}

export default App;
