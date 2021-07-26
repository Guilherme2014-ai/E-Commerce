const router = require('express').Router();
const publicController = require('../controllers/admin');


router.get('/', publicController.Index);
router.get('/users', publicController.Users);


module.exports = router;