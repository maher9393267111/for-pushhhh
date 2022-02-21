import React, { useState,useEffect } from "react";
import { auth,googleAuthProvider  } from "../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
// axios

import axios from "axios";


const Login = ({ history }) => {
  const [email, setEmail] = useState("gqlreactnode@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);


  // to check if user is login in and have info redirect him
  const { user } = useSelector((state) => ({ ...state }));



  let dispatch = useDispatch();


  useEffect(() => {

    // if come from page by redirect from that page
    // dont redirect the user
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
// if user is already login in and have token when 
// login page mounted hemen redirect th user to home page

      if (user && user.token) history.push("/");
    }
  }, [user, history]);




// send user info to backend to sava in database

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `http://localhost:5000/api/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const roleBasedRedirect = (res) => {

// check if intended 

let intended =history.location.state;
// console.log(intended.from)
// if (intended === 'cart'){
//   console.log(intended)
//   history.push('/cart')
// }

if (intended) {

history.push(intended.from)



}


else{ 
  if (res.data.role === "admin") {
    history.push("/admin/dashboard");
  } else {
    history.push("/user/history");
  }
}
};




// login in user



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  // console.table(email, password);
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    // console.log(result);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();

    createOrUpdateUser(idTokenResult.token)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          },
        });
        roleBasedRedirect(res);
      })
      .catch((error) => console.log(error));

    history.push("/");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
  }
};









// LOGIN WITH GOOGLE

const googleLogin = async () => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;

      // user token
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.message);
    });
};










  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>


        </div>
      </div>
    </div>
  );
};

export default Login;
