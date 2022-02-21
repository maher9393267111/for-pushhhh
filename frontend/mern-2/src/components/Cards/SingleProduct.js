import React from "react";
import { Card,Tabs,Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItem";
import { showAverage } from "../../functions/rating";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import _ from 'lodash'
import { useHistory } from "react-router-dom";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
const { Meta } = Card;

const { TabPane } = Tabs;


const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, slug,_id } = product;

  const [tooltip, setTooltip] = useState("Click to add");

 // router
 let history = useHistory();


 // redux
 const { user, cart } = useSelector((state) => ({ ...state }));
 const dispatch = useDispatch();


 const handleAddToCart = () => {
  // create cart array
  let cart = [];
  if (typeof window !== "undefined") {
    // if cart is in local storage GET it
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // push new product to cart
    cart.push({
      ...product,
      count: 1,
    });
    // remove duplicates
    let unique = _.uniqWith(cart, _.isEqual);
    // save to local storage
    // console.log('unique', unique)
    localStorage.setItem("cart", JSON.stringify(unique));
    // show tooltip
    setTooltip("Added");

    // add to reeux state
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
  }
};


const handleAddToWishlist = (e) => {
  e.preventDefault();
  addToWishlist(product._id, user.token).then((res) => {
    console.log("ADDED TO WISHLIST", res.data);
    toast.success("Added to wishlist");
    history.push("/user/wishlist");
  });
};






  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
        </Carousel>

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>


      </div>

      <div className="col-md-5">
      <h1 className="bg-info p-3">{title}</h1>


{/* Ratings stars show */}

      {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}





        <Card
        
        actions={[
          <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
          <Link onClick={handleAddToWishlist}>
            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
          </Link>,
          <RatingModal>
            <StarRating
              name={_id}
              numberOfStars={5}
             
              changeRating={onStarClick} 
              rating={star}
              
              isSelectable={true}
              starRatedColor="red"
            />
          </RatingModal>,
        ]}
      >


         <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;