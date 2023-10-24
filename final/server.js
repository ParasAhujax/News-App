const express = require('express');
const app = express();
const fetchData = require(__dirname+ "/middleware/fetchData")
const fetchRoute = require(__dirname + "/routes/fetchRoute")
require("dotenv").config()

// const NewsApi = require('newsapi');
// const newsapi = new NewsApi(`${process.env.API_KEY}`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use("/:api",express.static("./public"));
app.use("/news",fetchRoute);

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})