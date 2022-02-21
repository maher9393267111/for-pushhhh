const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {  emptyCart,userCart,getUserCart,saveAddress,
applyCouponToUserCart ,
createOrder,orders, addToWishlist,
wishlist,
removeFromWishlist,

} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart

router.get("/user/cart", authCheck, getUserCart); // get cart


router.delete("/user/cart", authCheck, emptyCart); // empty cart


router.post("/user/address", authCheck, saveAddress);


// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);


// order

router.post("/user/order", authCheck, createOrder);



router.get("/user/orders", authCheck, orders);



// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);





// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;