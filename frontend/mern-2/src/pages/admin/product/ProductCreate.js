

import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/Forms/ProductCreateForm";

import { getCategorySubs,getCategories } from "../../../functions/category";

import FileUpload from '../../../components/Forms/FileUpload'

import { LoadingOutlined } from "@ant-design/icons";


const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};



const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  

  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);


  const {
    title,
    description,
    price,
    category,
    categories,
    subs,
    shipping,
    quantity,
    images,
    color,
    brands,
    colors,
    brand,
  } = values;


 // redux
 const { user } = useSelector((state) => ({ ...state }));

 useEffect(() => {
   loadCategories();
 }, []);

 const loadCategories = () =>
   getCategories().then((c) => setValues({ ...values, categories: c.data }));


   const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value); // category options change

// set this category option that value category._id to category variable
// send this id {e.target.value} to  {api/category/subs/e.target.value}

// {subs:[]} >>> when category value change subs array well be empty

    setValues({ ...values,subs:[], category: e.target.value }); 
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);

      // set all subs that comes from bckend to setSubOptions
      // then use it in select input 
      setSubOptions(res.data);
    });

    // show sub options after fetch subs from backend
    setShowSub(true);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        window.alert(`Product ${res.data.title} is created.`);
        window.location.reload();
        toast.success("Product added successfully");
      })
      .catch((err) => {
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create Page</h4>
          <hr />

     
 {loading ? <LoadingOutlined/> : ''         }



          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>





          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
              subOptions={subOptions}
             showSub={showSub}
          />

        </div>
      </div>
    </div>
  );
};

export default ProductCreate;