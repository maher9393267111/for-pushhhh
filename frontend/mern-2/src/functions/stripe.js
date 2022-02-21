import axios from "axios";

export const createPaymentIntent = (authtoken,coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,

    // couponApplied is req.body.couponApplied and coupon his value {true or false}
    
    {couponApplied:coupon},
    {
      headers: {
        authtoken,
      },
    }
  );