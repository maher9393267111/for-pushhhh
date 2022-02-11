require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();

// routes
const authRoutes = require("./routes/auth");


const app = express()
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


// route
app.get("/api", (req, res) => {
    res.json({
      data: "hey you hit node API",
    });
  });




  // routes middleware
app.use("/api", authRoutes);




// connecting with mongodb


// Connect to mongodb
const URI = process.env.MONGODB_URL

mongoose
    .connect(URI, {
        useNewUrlParser: true,
     
    })
    .then(() => console.log('DB Connected'));



//PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})



