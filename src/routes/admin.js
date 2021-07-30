const router = require('express').Router();
const adminController = require('../controllers/admin');


router.get('/', adminController.Index);
router.get('/users', adminController.Users);
router.get('/looks', adminController.Looks);
router.get('/deletar/user/:id', adminController.UserDelete);
router.get('/editar/user/:email', adminController.userEdit);
router.get('/deletar/look/:id', adminController.DeleteLook);
router.get('/editar/look/:id', adminController.EditLook);
router.get('/look', adminController.InventoryCreate);
router.get('/categoria', adminController.CategoryCreate);
router.post('/categoria', adminController.CategoryCreate_POST);
router.post('/editar/user/:id', adminController.userEdit_POST);
router.post('/editar/look', adminController.EditLook_POST);
router.post('/look', adminController.InventoryCreate_POST);


module.exports = router;

