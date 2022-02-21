const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require('../models/coupon')
const  Order = require('../models/order')
exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;// with this product._id we can populate product info
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });
};






exports.getUserCart = async (req, res) => {

// first find the user that login in

  const user = await User.findOne({ email: req.user.email }).exec();


  // 2- find this user cart products 
  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

// 3- show this cart information products carttotal discounPrice

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};




exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};




exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email }, // find user wher his email is that
    { address: req.body.address } // update the user adress
  ).exec();

  res.json({ ok: true });
};




exports.applyCouponToUserCart = async (req, res) => {

  // 1- send cupon information in body {expire, name , discount%}
  const { coupon } = req.body;
  console.log("COUPON", coupon);


// 2- if the coupon name that sended from user is false or not
// valid show error message
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);

  // 3- find the current user with his email

  const user = await User.findOne({ email: req.user.email }).exec();

// 4- find this user cart information  and pull 
// products  and cartTotal from his cart

  let { products, cartTotal } = await (
   Cart.findOne({ orderdBy: user._id })
  )

  // 5- show every product _id and title and price

    .populate("products.product", "_id title price")
    .exec();

// validCoupon.discount === %50% ... 60% ... smae like that
  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // 6- calculate the total after discount

// all product prices - all product prices * discount%%%  / 100
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

// 7- after make discount update the cart totalPrice
// save this new cart information after updated

  Cart.findOneAndUpdate(
    { orderdBy: user._id }, // find by user
    { totalAfterDiscount }, // update disountTotal
    { new: true }
  ).exec();;


  // 8- response the data in json
  res.json(totalAfterDiscount);
};


exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  const { paymentIntent } = req.body.stripeResponse;
  console.log(paymentIntent)

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();


  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);







  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};



exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};






// wishlist


// addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
