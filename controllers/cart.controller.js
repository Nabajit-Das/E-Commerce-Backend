const mongoose = require("mongoose");
const cartModel = require("../models/cart.model");
const userModel = require("../models/user.model");
const productModel = require("../models/products.model");

exports.addToCart = async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.user });
    if (!user) {
      res.status(404).send({
        message: "Login first to add to cart",
      });
    } else {
      const product = await productModel.findOne({ name: req.body.product });
      if (!product) {
        res.status(404).send({
          message: "No such product found",
        });
      } else if (product.quantity < req.body.quantity) {
        res.status(404).send({
          message: "Not enough quantity",
        });
      } else {
        const cart = await cartModel.create({
          user: user._id,
          product: product._id,

        });
        user.cart.push(cart);
        await user.save();
        res.status(200).send({
          message: "Added to cart successfully",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error in adding to cart",
    });
  }
};
