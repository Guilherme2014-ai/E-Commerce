const session = require('express-session');
const flash = require('express-flash');
const express = require('express');
const path = require('path');
const app = express();


app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "asdjakshdkljashd2011445",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 }
}));
app.use(flash());


app.use("/admin", require('./routes/admin'));
app.use("/", require('./routes/public'));

module.exports = app;