const mongoose = require("mongoose");
const connectDatabase = async() => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    throw new Error("Problem with dataBase!");
  }
};
module.exports = {
  connectDatabase,
};
