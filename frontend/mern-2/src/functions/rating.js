

import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings; 
    let total = [];

    // number of users that make ratings star to this product
    let length = ratingsArray.length;


    // users number that make ratings 
    console.log("length", length);


    // checkk star from all ratings array and star+star .....

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    //  console.log("totalReduced", totalReduced);


     // heighest mean all users making rating * number of stars {5}
    let highest = length * 5;
    //  console.log("highest", highest);

     // maher give 3 stars   ---- moh give 2 stars 
     // length  >>>> 2 {maher, moh}
     // totalReduced = 3stars + 2stars = 5stars 
     // heighest =  length of users that make rating { maher,moh} * 5
     // heighest  =  2 * 5 = 10
      // result =  5 * 5 / 10  = 2.5 >>>>>>>>>>>>>>> 2 and  half star well show
    let result = (totalReduced * 5) / highest;
    //  console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />{" "}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};