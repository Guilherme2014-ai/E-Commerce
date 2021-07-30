const router = require('express').Router();
const adminController = require('../controllers/admin');


router.get('/', adminController.Index);
router.get('/users', adminController.Users);
router.get('/looks', adminController.Looks);
/*router.get('/deletar/user/:id', adminController);*/
/*router.get('/editar/user/:id', adminController);*/
/*router.post('/editar/user/:id', adminController);*/ // Aqui sera possivel mudar a rule.
router.get('/deletar/look/:id', adminController.DeleteLook);
router.get('/editar/look/:id', adminController.EditLook);
router.post('/editar/look', adminController.EditLook_POST);

router.get('/look', adminController.InventoryCreate);
router.post('/look', adminController.InventoryCreate_POST);

router.get('/categoria', adminController.CategoryCreate);
router.post('/categoria', adminController.CategoryCreate_POST);


module.exports = router;