const router = require("express").Router();
const user = require("../models/user.js");
const Order = require("../models/order.js");
const Book = require("../models/book.js");
const { authentication } = require("./userAuth.js");

//place order:
router.post("/place-order", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    // Process all orders asynchronously and wait for completion
    const orderPromises = order.map(async (items) => {
      const newOrder = new Order({
        user: id,
        book: items._id,
      });
      const orderDataFromDb = await newOrder.save();
      console.log(orderDataFromDb);
      // Saving order in user model:
      await user.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      console.log("push doned");

      // Clearing the cart and placing the order:
      await user.findByIdAndUpdate(id, {
        $pull: { cart: items._id },
      });

      return orderDataFromDb;
    });

    // Wait for all orders to be processed
    await Promise.all(orderPromises);

    return res.status(200).json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: `Error: ${err}` });
  }
});

//get order history of the particluar user:
router.get("/get-order-history", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await user.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const ordersData = userData.orders.reverse();
    return res.status(200).json({ status: "Success", data: ordersData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get-all-orders --admin:
router.get("/get-all-orders", authentication, async (req, res) => {
  try {
    const userData = await user
      .find()
      .populate({
        path: "orders",
      })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: userData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//update order ---admin:
router.put("/update-status/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const adminUser = await user.findById(id);
    if (adminUser.role !== "admin") {
      return res.status(400).json({ message: "only admin have access " });
    }
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.status(200).json({
      status: "Success",
      message: "Status Updated Succesfully",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
