require('dotenv').config()
const express = require("express");
const morgan = require("morgan")
//cors
const path = require("path");

const app = express();
const port = 5000;
require("./config/mongo_atlas.js"); //BBDD MongoDB conection

app.use(express.json());
app.use(morgan('combined'))

//Routes
const apiRoutes = require("./routes/api.routes");

app.use("/api", apiRoutes);

//Non existing routes
app.use("*", (req, res) => {
  res.status(404).json({
    message: "route not found",
  });
});

app.listen(port, () => {
  console.log(`Reallo Backend listening on port ${port}`);
});
