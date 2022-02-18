import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken: authtoken,
    },
  });
};



// fetch products in dashboard admin page


export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);




  // remover product



  export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

  

  export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);





  
export const updateProduct = async (slug, product, authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
  headers: {
    authtoken,
  },});




  export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });



// pagination

  export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);




  
export const productStar = async (productId, star, authtoken) =>
await axios.put(
  `${process.env.REACT_APP_API}/product/star/${productId}`,
  { star },
  {
    headers: {
      authtoken,
    },
  }
);



export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);




  export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);