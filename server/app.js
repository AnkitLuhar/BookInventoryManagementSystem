const express = require("express");
require("dotenv").config();
require("./connection/connection.js");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user.js");
const Books = require("./routes/books.js");
const favourites = require("./routes/favourite.js");
const cart = require("./routes/cart.js");
const order = require("./routes/order.js");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//routes::
app.use("/", user);
app.use("/", Books);
app.use("/", favourites);
app.use("/", cart);
app.use("/", order);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` SERVER IS RUNNING AT ${PORT}`);
});
