

const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,getSubs
} = require("../controllers/category")



// routes
router.post("/category", authCheck, adminCheck, create); // admin login create
router.get("/categories", list); // all can see it
router.get("/category/:slug", read); // specefic category
  router.put("/category/:slug", authCheck, adminCheck, update); // change specefic catgory
router.delete("/category/:slug", authCheck, adminCheck, remove); // delete specefic category

//get all subCategory that related to specefic category
router.get("/category/subs/:_id", getSubs);


module.exports = router;

