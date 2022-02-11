import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Practice from './components/practice'

import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import RegisterComplete from './components/auth/RegisterComplete'
import Overlay from "./components/overlay";
import Register from "./components/auth/Register";

function App(props) {
  return (
    <div>

<Navbar/>
<Overlay/>


 <ToastContainer /> 
      <Switch>
         {/* <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} /> */}
        <Route exact path="/register" component={Register} /> 
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>



    </div>
  )
}



export default App
