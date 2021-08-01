const auth = require('./middlewares/auth');
const session = require('express-session');
const flash = require('express-flash');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, path.join(__dirname, 'public'));
    },

    filename(req,file,cb){
        cd(null, `${Date.now()}${file.originalname}`);
    }
})

const uploud = multer({
    storage,

    limits: {
        fileSize: 1048576 * 4
    }
})

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

// Socket IO
    io.on('connection', socket => {
        socket.on('buy', order => {
            socket.broadcast.emit('newOrder', order);
            socket.emit('newOrder', order);
        })
    })

// Routes
    app.use("/admin", auth, require('./routes/admin'));
    app.use("/", require('./routes/public'));

module.exports = server;

// Responsividade, Flash Messages e moderacao de imagem.