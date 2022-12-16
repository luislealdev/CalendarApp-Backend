const express = require("express");
var cors = require("cors");
const { connectDatabase } = require("./dataBase/config");
require("dotenv").config();

//Create app
const app = express();
//Add cors (Security)
app.use(cors());
//Connect db
connectDatabase();
//Use public folder
app.use(express.static("public"));
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
