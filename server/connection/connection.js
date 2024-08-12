const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.USERNAMEE;
const password = process.env.PASSWORD;
console.log(username);
console.log(password);
const connecting = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@bookdata.xjiyglt.mongodb.net/BookData`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("database is connected");
  } catch (err) {
    console.log(err);
  }
};
connecting();
