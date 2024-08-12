const router = require("express").Router();
const user = require("../models/user.js");
const cart = require("../models/order.js");
const Book = require("../models/book.js");
const { authentication } = require("./userAuth.js");

//put books to cart:
router.put("/add-to-cart", authentication, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const findUser = await user.findById(id);
    if (!findUser) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const isBookCart = findUser.cart.includes(bookid);
    if (isBookCart) {
      return res
        .status(400)
        .json({ status: "Success", message: "book is already been carted" });
    }

    await user.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "book is added in the cart" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete book from the cart:
router.post("/remove-from-cart/:bookid", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.params;
    const findUserB = await user.findById(id);
    if (!findUserB) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const userCart = findUserB.cart.includes(bookid);
    if (!userCart) {
      return res.status(400).json({ message: "bookid is not present" });
    }
    await user.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({
      status: "Success",
      message: "book deleted  from the cart is succesfully",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get all the book from the cart
router.get("/get-from-cart", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const cartUser = await user.findById(id);
    if (!cartUser) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const cartData = cartUser.cart.reverse();
    return res.status(200).json({ status: "Success", data: cartData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
