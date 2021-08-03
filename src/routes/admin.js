const adminController = require('../controllers/admin');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, path.join(__dirname,`..`,`uploads`)); // aqui na maquina esta funcionando porem no heroku nao
        /*
        Possiveis Solucoes:
        1- Mudar o Multer e suas Config para o app.
        */
    },

    filename(req,file,cb){
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const uploud = multer({
    storage,
    limits: { fileSize: 1048576 * 4 }
});

// GET's
router.get('/', adminController.Index);
router.get('/users', adminController.Users);
router.get('/looks', adminController.Looks);
router.get('/deletar/user/:id', adminController.UserDelete);
router.get('/editar/user/:email', adminController.userEdit);
router.get('/deletar/look/:id', adminController.DeleteLook);
router.get('/editar/look/:id', adminController.EditLook);
router.get('/look', adminController.InventoryCreate);
router.get('/categoria', adminController.CategoryCreate);
router.get('/orders', adminController.Orders)

// POST's
router.post('/categoria', uploud.single('compImg'), adminController.CategoryCreate_POST);
router.post('/editar/user/:id', adminController.userEdit_POST);
router.post('/editar/look', adminController.EditLook_POST);
router.post('/look', uploud.single('compImg'), adminController.InventoryCreate_POST);


module.exports = router;