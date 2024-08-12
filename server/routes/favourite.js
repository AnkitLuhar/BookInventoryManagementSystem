const router = require("express").Router();
const user = require("../models/user.js");
const Book = require("../models/book.js");
const jwt = require("jsonwebtoken");
const { authentication } = require("./userAuth.js");

//add book to favourites.

router.post("/add-book-to-favourite", authentication, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await user.findById(id);
    if (!userData) {
      return res.status(400).json({ message: "user not found" });
    }
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res
        .status(200)
        .json({ message: "book is already in the favourites" });
    }
    await user.findByIdAndUpdate(id, {
      $push: { favourites: bookid },
    });
    return res.status(200).json({ message: "book is added to  favourites" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete book to favourites.
router.post("/delete-book-from-favourite", authentication, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const findUser = await user.findById(id);
    if (!findUser) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const existBookId = findUser.favourites.includes(bookid);
    if (!existBookId) {
      return res.status(400).json({
        message: "not in favourite section,check your bookId again ",
      });
    }
    await user.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    return res
      .status(200)
      .json({ message: "book removed from the favourites" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get all-book of particular user which are in favourites.
router.get("/get-favourite-books", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const findUser = await user.findById(id);

    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Fetch all favorite books by resolving all promises
    const favouritesDatabyUser = await Promise.all(
      findUser.favourites.map((bookId) => Book.findById(bookId))
    );

    return res.status(200).json({
      status: "Success",
      data: favouritesDatabyUser,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/get-favourite-books/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await user.findById(id);
    if (!findUser) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "book not found,id is wrong" });
    }
    if (book) {
      return res.status(200).json({
        status: "Success",
        data: book,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
