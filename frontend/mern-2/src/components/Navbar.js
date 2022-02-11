import './nav.css'

import React from "react";
import {
  Navbar,
  Nav,
  Col,
  Form,
  FormControl,
  NavDropdown,
  Button
} from "react-bootstrap";
export default () => {
  return (
    <Navbar className="nav-container" bg="light" expand="lg">
     
    
      <Navbar.Brand href="#home">mern SHOPPING</Navbar.Brand>
    
      
       
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
         
        </Form>

<div className="right-nav">
  
<div className="icon" style={{marginRight:'30px'}}>
<i className="fa-solid fa-cart-shopping"></i>
</div>



<div className="login">
    <span><i class="fa-regular fa-user"></i> </span>
    Login
</div>




</div>







    </Navbar>
  );
};
