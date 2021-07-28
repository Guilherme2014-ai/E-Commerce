const router = require('express').Router();
const publicController = require('../controllers/public');


router.get('/', publicController.Index);
router.get('/category/:slug', publicController.Category);
router.get('/inventory/:id', publicController.Inventory);
router.get('/cadastro', publicController.newAccount);
router.post('/cadastro', publicController.newAccount_POST);
/*router.get('/login', publicController.Login); // Later than "Cadastro"*/
router.post('/buy', publicController.Buy); // Terminar dps que Terminar a session de login


module.exports = router;