import express from "express";
import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { name, description, price, countInStock, image, category, brand } =
//       req.body;
//     const product = new Product({
//       name,
//       description,
//       price,
//       countInStock,
//       image,
//       category,
//       brand,
//     });
//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   })
// );

export default router;
