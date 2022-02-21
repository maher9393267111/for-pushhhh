import React from "react";
import { useEffect,useState,lazy,Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { useDispatch,useSelector } from "react-redux";
import { getCategories } from "./functions/category";
import {currentUser} from './functions/auth'
import { LoadingOutlined } from "@ant-design/icons";
// ideDrawer from "./components/drawer/SideDrawer";
// import Practice from './components/practice'
// import Home from "./pages/Home";
// 
// import Navbar from "./components/Navbar";
// import RegisterComplete from './pages/RegisterComplete'
// ;
// import Register from "./pages/Register";
// import Login from './pages/Login'
// import ForgotPassword from "./pages/ForgotPassword";

// 
// 
// import UserRoute from "./components/routes/UserRoute";
// import History from './pages/user/History'
// import Password from "./pages/user/Password";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from './pages/admin/category/CategoryCreate'
// import AdminRoute from "./components/routes/AdminRoute";
// import SubCreate from  './pages/admin/sub/SubCreate'         
// import SubUpdate from './pages/admin/sub/SubUpdate'
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import Product from "./pages/Product";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import SubHome from "./pages/sub/SubHome";
// import CategoryHome from "./pages/category/CategoryHome";
// import Shop from "./pages/shop";

// import Cart from "./pages/Cart";
// import Payment from "./pages/Payment";
// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
// import Wishlist from './pages/user/Wishlist'
// import Checkout from "./pages/Checkout";



// using lazy
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./components/Navbar"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const RegisterComplete = lazy(() => import("./pages/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));






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
    < Suspense
    fallback={
      <div className="col text-center p-5">
        __ React Redux EC
        <LoadingOutlined />
        MMERCE __
      </div>
    }>

<Navbar/>



 <ToastContainer />

  <SideDrawer /> 
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

        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/payment" component={Payment} />
        <Route exact path="/shop" component={Shop} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
      </Switch>




    </Suspense>
  )
}



export default App
