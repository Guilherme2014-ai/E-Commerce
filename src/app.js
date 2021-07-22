const express = require('express');
const path = require('path');
const app = express();


app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/admin", require('./routes/admin'));
app.use("/", require('./routes/public'));

module.exports = app;