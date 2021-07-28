const router = require('express').Router();
const publicController = require('../controllers/public');


router.get('/', publicController.Index);
router.get('/category/:slug', publicController.Category);
router.get('/inventory/:id', publicController.Inventory);
router.get('/buy', publicController.Buy);


module.exports = router;