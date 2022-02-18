import React from "react";
import Jumbotron from "../components/Cards/jumbatron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import SubList from '../components/sub/SubList'
import CategoryList from "../components/category/CategoryList";
const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
      
        <Jumbotron text={["New",'Arrivals']} />
      </h4>
      <NewArrivals />

      <h4 className="text-center color- p-3 mt-5 mb-5 display-4 jumbotron">
      <Jumbotron text={["Best",'Sellers']} />
      </h4>
      <BestSellers />


      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />


      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList />



      <br />
      <br />

      
    </>
  );
};

export default Home;