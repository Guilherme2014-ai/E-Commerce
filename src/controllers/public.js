const categoriesModel = require('../models/categories');
const usersModel = require('../models/users');
const inventoryModel = require('../models/inventory');
const categoriesFactory = require('../factory/categories');
const ValidationService = require('../services/validation');


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

            const isEmpety = ValidationService.isEmpyt(slug);
            const isValid = ValidationService.isValid(slug);

            const ok = isEmpety == false && isValid == true;

            if(ok){
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
            }else{
                res.status(400);
                res.sendStatus(400);
            }

        } catch(err){ console.error(err) };
    };
    async Inventory(req,res){
        try{

            const { id } = req.params;
            const look = await inventoryModel.FindOne(id);
            const categories = await categoriesModel.FindAll();

            const isEmpety = ValidationService.isEmpyt(id);
            const isValid = ValidationService.isValid(id);

            const ok = isEmpety == false && isValid == true;

            if(ok){
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
    
    
                res.render('public/inventory', { look: look[0],categories });
            }else{
                res.status(400);
                res.sendStatus(400);
                return;
            };

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };
    async Buy(req,res){
        try{

            const { address,quantity } = req.body;
            const { email,number } = req.session;
            console.log(req.session)

            const content = [ address,quantity ]

            const HasEmpetyItem = ValidationService.HasEmpetyItem(content);
            const HasInvalidItem = ValidationService.HasInvalidItem(content);

            const ok = HasEmpetyItem == false && HasInvalidItem == false;

            if(ok){

                //later than sessions

            }else{
                res.status(400);
                res.sendStatus(400);
                return;
            };

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };
    async newAccount(req,res){
        try{

            const categories = await categoriesModel.FindAll();

            res.render('public/newAccount', { categories });

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };
    async newAccount_POST(req,res){
        try{

            const { name,email,number,password } = req.body;
            const user = { name,email,number,password }

            console.log(user)
            const content = [ name,email,number,password ];

            const HasEmpetyItem = ValidationService.HasEmpetyItem(content);
            const HasInvalidItem = ValidationService.HasInvalidItem(content);

            const ok = HasEmpetyItem == false && HasInvalidItem == false;

            if(ok){

                const wasCreated = await usersModel.Create(user);

                if(wasCreated == 500){
                    res.status(500);
                    res.sendStatus(500);
                    return;
                };

                res.redirect('/');

            }else{}

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };

};

module.exports = new Public();