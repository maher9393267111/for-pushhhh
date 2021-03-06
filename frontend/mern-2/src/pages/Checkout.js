import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart,emptyUserCart,saveUserAddress,applyCoupon } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({history}) => {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");




  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      console.log(products)
      setTotal(res.data.cartTotal);
    });
  }, []);



  const saveAddressToDb = () => {
     console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };





  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount('')
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };




  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data); ///////// discount price from 
        // update redux coupon applied

     // update redux coupon applied true/false
     dispatch({
      type: "COUPON_APPLIED",
      payload: true,
    });


        toast.success("price after applied coupon dsicount");
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );




  const showProductSummary = () =>
  products.map((p, i) => (
    <div key={i}>
      <p>
        {p.product.title} ({p.color}) x {p.count} ={" "}
        {p.product.price * p.count}
      </p>
    </div>
  ));

const showApplyCoupon = () => (
  <>
    <input
      onChange={(e) => {
        setCoupon(e.target.value);
        setDiscountError("");
      }}
      
      value={coupon}
      type="text"
      className="form-control"
    />
  
    <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
      Apply
    </button>

    <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}


  </>
);





  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />


        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}



        <div className="row">
          <div className="col-md-6">
            <button
            onClick={()=>{history.push('/payment')}}
            disabled={!addressSaved || !products.length} className="btn btn-primary">Place Order</button>
          </div>

          <div className="col-md-6">
            <button  disabled={ !products.length}
              onClick={emptyCart} className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout