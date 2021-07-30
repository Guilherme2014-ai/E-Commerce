const session = require('express-session');
const flash = require('express-flash');
const express = require('express');
const path = require('path');
const app = express();

// Config
    app.set("views", path.join(__dirname, 'views'));
    app.set("view engine", "ejs");

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

// Session
    app.use(session({
        secret: 'gabrielviado2014',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 } // || secure: true
    }));
    app.use(flash());

// Routes
    app.use("/admin", require('./routes/admin'));
    app.use("/", require('./routes/public'));

module.exports = app;

// Controle de Administracao e moderacao de imagem, Views de compras.