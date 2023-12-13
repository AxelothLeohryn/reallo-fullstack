require("dotenv").config();
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
//cors
const path = require("path");

const app = express();
const port = 5000;
require("./config/mongo_atlas.js"); //BBDD MongoDB conection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));

//Routes
const apiRoutes = require("./routes/api.routes.js");
const userRoutes = require("./routes/user.routes.js");

app.use("/api", apiRoutes);
app.use("/user", userRoutes);

//Non existing routes
//Capture All 404 errors
const errors = require("./middlewares/errors");
app.use(errors.error404);

app.listen(port, () => {
  console.log(`Reallo Backend listening on port ${port}`);
});
