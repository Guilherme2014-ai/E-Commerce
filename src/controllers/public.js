const categoriesModel = require('../models/categories');
const categoriesFactory = require('../factory/categories')

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

            if(categoryRaw == 404){
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

            console.log(category)

            res.render('public/category', { category,categories });

        } catch(err){ console.error(err) };
    }

};

module.exports = new Public();