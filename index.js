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


//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

app.listen(port, () => {
  console.log(`Reallo Backend listening on port ${port}`);
});
