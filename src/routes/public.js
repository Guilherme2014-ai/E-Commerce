const router = require('express').Router();
const userModel = require('../models/users');
const publicController = require('../controllers/public');


// Get
    router.get('/', publicController.Index);
    router.get('/category/:slug', publicController.Category);
    router.get('/inventory/:id', publicController.Inventory);
    router.get('/cadastro', publicController.newAccount);
    router.get('/login', publicController.Login);

// Post
    router.post('/cadastro', publicController.newAccount_POST);
    router.post('/login', publicController.Login_POST);
    router.post('/buy', publicController.Buy);

// Others
module.exports = router;

// Next Step: Roupa-Admin, Flash Messages & Verification.