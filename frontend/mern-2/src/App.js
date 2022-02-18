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
import RegisterComplete from './pages/RegisterComplete'
;
import Register from "./pages/Register";
import Login from './pages/Login'
import ForgotPassword from "./pages/ForgotPassword";
import {currentUser} from './functions/auth'
import { auth } from "./firebase";
import { useDispatch,useSelector } from "react-redux";
import UserRoute from "./components/routes/UserRoute";
import History from './pages/user/History'
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from './pages/admin/category/CategoryCreate'
import AdminRoute from "./components/routes/AdminRoute";
import SubCreate from  './pages/admin/sub/SubCreate'         
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from "./pages/admin/product/ProductCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import Product from "./pages/Product";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import SubHome from "./pages/sub/SubHome";
import CategoryHome from "./pages/category/CategoryHome";
import Shop from "./pages/shop";
import { getCategories } from "./functions/category";


function App(props) {

  const dispatch = useDispatch(); // action method


 // to check firebase auth state
 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);



      // current user send token to backend admin to check
      // then response data from backend about user information to set it in navbar
      currentUser(idTokenResult.token)  // after send token get user info in redux
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role, // admin or normal user
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  });
  // cleanup
  return () => unsubscribe();
}, []);



const { category } = useSelector((state) => ({ ...state }));

// fetch all categories

useEffect(() => {
 
  getCategories().then((res) =>  dispatch({type:"CATEGORY_ALL",
  
  payload:{

    category:res.data
  }
 })   );
}, []);








  return (
    <div>

<Navbar/>



 <ToastContainer /> 
      <Switch>
           <Route exact path="/" component={Home} /> 
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/register" component={Register} /> 
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <AdminRoute     exact  path="/admin/product/:slug"    component={ProductUpdate}  />

        <Route exact path="/shop" component={Shop} />
      </Switch>



    </div>
  )
}



export default App
