const router = require('express').Router();
const publicController = require('../controllers/admin');


router.get('/', publicController.Index);


module.exports = router;