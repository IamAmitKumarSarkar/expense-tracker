import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//import all the files in this folder which is routing

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/UserContex';
import {Toaster} from "react-hot-toast"

const App = () => {

   const user = JSON.parse(localStorage.getItem("user"));

  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path = "/" element = {!user ? <Login /> : <Navigate to="/dashboard" />}/>
          <Route path = "/login" exact element= {<Login/>} />  
          <Route path = "/signUp" exact element= {<SignUp/>} />  
          <Route path = "/dashboard" exact element= {<Home />} />  
          <Route path = "/income" exact element= {<Income />} />  
          <Route path = "/expense" exact element= {<Expense/>} />  

        </Routes>
      </Router>
    </div>

    <Toaster
      ToastOptions={{
        className: "",
        style: {
          fontSize:'13px' 
        },
      }}
      />
    </UserProvider>
  )
}

export default App;


const Root = () =>{
  //check if token exist in localstorage(!! --> this is use because of strict boolean)
  const isAuthenticated = !!localStorage.getItem("token");  

  //redirect to dashboard if authenticated,otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
