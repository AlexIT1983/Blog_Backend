// Наше приложение для бекэнда

require("dotenv").config();
const express = require("express"); // подлючаем express
const mongoose = require("mongoose"); // подлючаем mongoose
const cookieParser = require("cookie-parser"); // подлючаем cookie-parser
const routes = require("./routes");

const port = 3001; // задать порт

const app = express(); // экземпляр приложения

app.use(express.static("../frontend/build"));

app.use(cookieParser()); // подлючаем middleware
app.use(express.json()); // parser json

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
