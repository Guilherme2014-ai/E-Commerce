const categoriesModel = require('../models/categories');
const inventoryModel = require('../models/inventory');
const categoriesFactory = require('../factory/categories');

class Public{

    async Index(req,res){
        try {
            
            const categories = await categoriesModel.FindAll();

            res.render("public/index.ejs", { categories });

        } catch(err){
            console.error(err);
        }
    };
    async Category(req,res){
        try {

            const { slug } = req.params;

            const categoryRaw = await categoriesModel.FindOne(slug);
            const categories = await categoriesModel.FindAll();

            if(categoryRaw == 404){ //Add uma tela para isso
                res.sendStatus(404);
                res.status(404);
                return;
            };
            if(categoryRaw == 500){
                res.sendStatus(500);
                res.status(500);
                return;
            };

            const category = categoriesFactory(categoryRaw);

            res.render('public/category', { category,categories });

        } catch(err){ console.error(err) };
    };
    async Inventory(req,res){
        try{

            const { id } = req.params;
            const look = await inventoryModel.FindOne(id);
            const categories = await categoriesModel.FindAll();

            if(look == 400){
                res.status(400);
                res.sendStatus(400);
                return;
            }
            if(look == 500){
                res.status(500);
                res.sendStatus(500);
                return;
            }


            res.render('public/inventory', { look: look[0],categories })

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };

};

module.exports = new Public();