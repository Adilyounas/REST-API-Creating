const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 4500;
const bodyParser = require("body-parser");
mongoose.set("strictQuery", true);

//use it express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//mongoose schema
const Schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
});

//mongoose model / or it is a collection
const Product = new mongoose.model("Product", Schema);
// {*<<<<<<<<<<<some important status codes are here>>>>>>>>>>>*}

// 404 not found
//200 found
//500 server error
// 201 created

// {<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>}

//create new product through async await through front end
app.post("/api/v1/product/new", async (req, res) => {
    // as front end is empty so we send data from postman and receiving it in body
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

//Read products using async await
//now postman receiving data from this URL
app.get("/api/v1/products", async (req, res) => {
    const product = await Product.find();

    res.status(200).json({
        success: true,
        product,
    });
});

//update products
//put will receive and then send data
// :id is not fixed like product here
// :id url per id aye gi to us ka matlab pora product hoa na.
//we use let here
app.put("/api/v1/product/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id, req.body
        //     ,

        //     {
        //     new: true,
        //     useFindAndModify: false,
        //     runValidators: true,
        //   } 

    );

    if (!product) {
        res.status(500).json({
            success: false,
            message: "product not found",
        });
    }
    res.status(200).json({
        success: true,
        massage: "product updated",
        product,
    });
});




//delete product
app.delete("/api/v1/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    await product.remove();

    if (!product) {
        res.status(500).json({
            success: false,
            message: "product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "product deleted",
        product,
    });
});




//node server
app.listen(port, () => {
    console.log("Node Connected!");
});

//mongoDB server
mongoose
    .connect("mongodb://127.0.0.1:27017/newProducts")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
