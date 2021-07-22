const express = require('express');
const database = require('./database/connection');
const app = express();


app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/admin", require('./routes/admin'));
app.use("/", require('./routes/public'));

module.exports = app;