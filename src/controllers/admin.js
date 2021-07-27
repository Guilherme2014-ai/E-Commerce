const CategoriesModel = require('../models/categories');
const UsersModel = require('../models/users');

class Admins{

    async Index(req,res){
        try{

            const categories = await CategoriesModel.FindAll();

            res.render('admin/index', { categories });

        } catch(err){
            console.error(err);
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

};

module.exports = new Admins();