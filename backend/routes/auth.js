const express = require("express");

const router = express.Router();

// middlewares
const { authCheck,adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser,currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);


// current user

router.post("/current-user", authCheck, currentUser);


// admin 

router.post("/current-admin", authCheck, adminCheck, currentUser);



module.exports = router
