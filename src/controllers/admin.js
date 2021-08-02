const CategoriesModel = require('../models/categories');
const InvetoryModel = require('../models/inventory');
const InvetoryFactory = require('../factory/inventories');
const ValidationService = require('../services/validation');
const OrdersModel = require('../models/orders');
const UsersModel = require('../models/users');

class Admins{

    async Index(req,res){
        try{

            const categories = await CategoriesModel.FindAll();

            res.render('admin/index', { categories });

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async Users(req,res){
        try{
            const users = await UsersModel.FindAll();
            const categories = await CategoriesModel.FindAll();
            
            res.render('admin/users', { users, categories  });

        } catch(err){
            console.error(err);
        };
    };
    async Looks(req,res){
        try{

            const categories = await CategoriesModel.FindAll();
            const inventory = await InvetoryModel.FindAll();

            res.render('admin/looks', { categories,inventory });

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async DeleteLook(req,res){
        try{

            const { id } = req.params;

            const deleted = await InvetoryModel.DeleteOne(id);

            if(deleted == 400){
                res.status(400);
                res.sendStatus(400);
                return;
            };
            if(deleted == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.redirect('/admin/looks')

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async EditLook(req,res){
        try{

            const { id } = req.params;

            const look = await InvetoryModel.FindOne(id);
            const categories = await CategoriesModel.FindAll();
            
            if(look == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };
            if(look == 404){
                res.status(404);
                res.sendStatus(404);
                return;
            };
            if(look == 400){
                res.status(400);
                res.sendStatus(400);
                return;
            };

            res.render('admin/inventoryEdit', { categories,look: look[0] });

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async EditLook_POST(req,res){
        try{
            const { id,name,img,desc } = req.body;
            const data = { name,img,desc };

            const update = await InvetoryModel.UpdateOne(id,data);

            if(update == 400){
                res.status(400);
                res.sendStatus(400);
                return;
            };
            if(update == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.redirect('/admin/looks')

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async InventoryCreate(req,res){
        try{

            const categories = await CategoriesModel.FindAll();
            res.render('admin/inventoryCreate', { categories });

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async InventoryCreate_POST(req,res){
        try{
            req.body["isLink"] == "true" ? req.body['img'] = req.body["linkImg"] : req.body['img'] = `http://localhost/uploads/${req.file.filename}`;

            const data = InvetoryFactory(req.body);

            if(ValidationService.isEmpyt(data['name']) == true || ValidationService.isEmpyt(data['img']) == true || ValidationService.isEmpyt(['price']) == true || ValidationService.isEmpyt(['category_id']) == true || ValidationService.isEmpyt(data['desc']) == true){
                res.status(400);
                res.sendStatus(400);
                return;
            };

            const created = await InvetoryModel.Create(data);

            if(created == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.redirect('/admin/looks');

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async CategoryCreate(req,res){
        try{
            
            const categories = await CategoriesModel.FindAll();

            res.render('admin/categoryCreate', { categories })

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async CategoryCreate_POST(req,res){
        try{
            
            const { name,img } = req.body;

            if(ValidationService.isEmpyt(name) == true || ValidationService.isEmpyt(img) == true){
                res.status(400);
                res.sendStatus(400);
                return;
            };

            const data = { name,img,slug: String(String(name).replace(' ','-').toLowerCase()) }

            const saved = await CategoriesModel.Create(data);

            if(saved == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.redirect('/admin/looks');

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };
    async UserDelete(req,res){
        try{

            const { id } = req.params;

            const isValid = id != undefined && id != "" && id != " ";

            if(isValid == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            if(isValid){
                const deleted = await UsersModel.DeleteUser(id);
                if(deleted == 500){
                    res.status(500);
                    res.sendStatus(500);
                    return;
                };
                res.redirect('/admin/users')
            }else{
                res.status(400);
                res.sendStatus(400);
                return;
            };

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        }
    };
    async userEdit(req,res){
        try{

            const { email } = req.params;
            const categories = await CategoriesModel.FindAll();
            const user = await UsersModel.FindOne(email);

            if(user == 404){
                res.status(404);
                res.sendStatus(404);
                return;
            };
            if(user == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.render('admin/userEdit', { categories,user });

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        }
    };
    async userEdit_POST(req,res){
        try{

            const { id,name,email,rule,number } = req.body;
            const data = { name,email,rule,number }

            if(id == "" || id == " "){
                res.status(400);
                res.sendStatus(400);
                return;
            };
            if(ValidationService.isEmpyt(name) == true || ValidationService.isEmpyt(email) == true || ValidationService.isEmpyt(rule) == true || ValidationService.isEmpyt(number) == true){
                res.status(400);
                res.sendStatus(400);
                return;
            };

            const userUpdate = await UsersModel.updateUser(id,data);

            if(userUpdate == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.redirect('/admin/users');

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        }
    };
    async Orders(req,res){
        try{

            const categories = await CategoriesModel.FindAll();
            const orders = await OrdersModel.FindAll();

            if(orders == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            };

            res.render('admin/orders', { categories,orders })

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
        };
    };

};

module.exports = new Admins();

