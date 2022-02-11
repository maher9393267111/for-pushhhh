import React from "react";
import { useEffect,useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Practice from './components/practice'
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import RegisterComplete from './components/auth/RegisterComplete'
import Overlay from "./components/overlay";
import Register from "./components/auth/Register";
import Login from './pages/Login'
import ForgotPassword from "./pages/ForgotPassword";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";



function App(props) {

  const dispatch = useDispatch(); // action method


// to check firebase auth state
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => { // current user login
    if (user) {

      // user token
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
    }
  });
  // cleanup
  return () => unsubscribe();
}, []);



  return (
    <div>

<Navbar/>
<Overlay/>


 <ToastContainer /> 
      <Switch>
           <Route exact path="/" component={Home} /> 
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/register" component={Register} /> 
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>



    </div>
  )
}



export default App
