const router = require('express').Router();
const publicController = require('../controllers/public');


router.get('/', publicController.Index);


module.exports = router;