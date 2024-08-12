const router = require("express").Router();
const user = require("../models/user.js");
const Book = require("../models/book.js");
const jwt = require("jsonwebtoken");
const { authentication } = require("./userAuth.js");

//add book by admin.

router.post("/add-book", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const findUser = await user.findById(id);
    if (findUser.role !== "admin") {
      return res
        .status(400)
        .json({ message: "Your are not having access to perform admin task" });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    const savedBook = await book.save();
    return res.status(200).json(savedBook);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//update book by admin.

router.put("/update-book", authentication, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const findBook = await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    if (!findBook) {
      return res.status(400).json({ message: "book not updated succesfully" });
    }
    return res.status(200).json({ message: "book updated successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete book by admin.

router.delete("/delete-book", authentication, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const deleteBook = await Book.findByIdAndDelete(bookid);
    if (!deleteBook) {
      return res
        .status(400)
        .json({ message: "deletion of the book is denied" });
    }
    return res
      .status(200)
      .json({ message: "deletion of the book is succesfull" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get-all-books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: "Success",
      data: books,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get-recent-books::
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "",
      data: books,
    });
  } catch (err) {
    return res.status(500).json({ message: "An error occured" });
  }
});
//get books by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(400)
        .json({ message: "there is some issue in the id number" });
    }
    return res.status(200).json({
      status: "Success",
      data: book,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
