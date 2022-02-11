

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();



// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());



const authRoutes =require('./routes/auth')

// routes middleware

 app.use('/api',authRoutes)


//  readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));



mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
     
    })
    .then(() => console.log('DB Connected'));



//PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})
