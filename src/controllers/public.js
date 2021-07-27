const CategoriesModel = require('../models/categories');

class Public{

    async Index(req,res){
        try {
            
            const categories = await CategoriesModel.FindAll();

            res.render("public/index.ejs", { categories });

        } catch(err){
            console.error(err);
        }
    };

};

module.exports = new Public();