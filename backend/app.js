//Core module
const path = require("path");

//External module
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const DB_PATH = "mongodb://localhost:27017/";

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorsController = require("./controllers/errors");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

app.use(errorsController.pageNotFound);

const PORT = 3001;

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to Mongo");
  app.listen(PORT, () => {
    console.log(`Server running at address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log("Error while connecting to Mongo: ", err);
});
