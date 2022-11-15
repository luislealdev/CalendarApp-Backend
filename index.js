const express = require("express");
const { connectDatabase } = require("./dataBase/config");
require("dotenv").config();

//Create app
const app = express();
//Connect db
connectDatabase();
//Use public folder
app.use(express.static("public"));
app.use(express.json());
app.use("/api/auth", require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
