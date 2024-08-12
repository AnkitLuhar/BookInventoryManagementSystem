const router = require("express").Router();
const user = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { authentication } = require("./userAuth.js");
require("dotenv").config();
// const bcrypt = require("bcryptjs");

//sign-Up:
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username length should be greater than 3" });
    }
    //check username already taken or not?
    const existUsername = await user.findOne({ username: username });
    if (existUsername) {
      return res.status(400).json({ message: "username already exist" });
    }
    //check email already exist or not:
    const existEmail = await user.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({ message: "email already exist" });
    }
    //check password length:
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password length should be greater than 5" });
    }
    // const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      username: username,
      email: email,
      //   password: hashPassword,
      password: password,
      address: address,
    });
    const saveUser = await newUser.save();
    if (saveUser) {
      return res.status(200).json({ message: "sign-up successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "issue in save the data into the database" });
    }
  } catch (err) {
    res.status(500).json({ message: `: ${err}` });
  }
});

//sign-in:
router.post("/sign-in", async (req, res) => {
  try {
    //checking existing username:
    const { username, password } = req.body;
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const authClaims = [
        { name: existingUser.username },
        { role: existingUser.role },
      ];
      const token = jwt.sign({ authClaims }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      if (password == existingUser.password) {
        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
});

//get-user-information:
router.get("/get-user-info", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await user.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//update-address::
router.put("/update-address", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    await user.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "address update is succesfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

module.exports = router;
