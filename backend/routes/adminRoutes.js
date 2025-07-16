import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
// import order from "../models/order.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// GET /api/admin/users - Get all users (admin only)
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// GET /api/admin/orders - Get all orders (admin only)
router.get("/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// GET /api/admin/revenue - Calculate total revenue (admin only)
router.get("/revenue", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate revenue" });
  }
});

// Create admin user (open route, or you can protect if needed)
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: true, // <- Make sure to set admin flag
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  })
);
// Get all products (admin only)

router.get(
  "/products",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// Create a product (admin only)
router.post(
  "/product",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, price, countInStock, image, category, brand } =
      req.body;
    const product = new Product({
      name,
      description,
      price,
      countInStock,
      image,
      category,
      brand,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

// Delete product by ID (admin only)
router.delete(
  "/product/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

// Update product by ID (admin only)
router.put(
  "/product/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const { name, description, price, countInStock, image, category, brand } =
        req.body;
      product.name = name;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;
      product.image = image;
      product.category = category;
      product.brand = brand;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
