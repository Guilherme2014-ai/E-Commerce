const usersModel = require('../models/users');
const ordersModel = require('../models/orders');
const inventoryModel = require('../models/inventory');
const categoriesModel = require('../models/categories');
const categoriesFactory = require('../factory/categories');
const ValidationService = require('../services/validation');


class Public{

    async Index(req,res){
        try {
        
            const categories = await categoriesModel.FindAll();

            res.render("public/index.ejs", { categories,errors: req.flash("errors") });

        } catch(err){
            console.error(err);
            res.status(500);
            res.sendStatus(500);
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
    
                const user = req.session.user;
                console.log(user);
                
                res.render('public/inventory', { look: look[0],categories,user });
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

            const { address,quantity,orderId } = req.body;
            if(req.session.user){
                const { email,number,name } = req.session.user;

                const content = [ address,quantity ]
    
                const HasEmpetyItem = ValidationService.HasEmpetyItem(content);
                const HasInvalidItem = ValidationService.HasInvalidItem(content);
    
                const ok = HasEmpetyItem == false && HasInvalidItem == false;
    
                if(ok){
    
                    const order = { email,number,name,address,quantity,order_id: orderId };
                    const saved = await ordersModel.Create(order);
                    
                    if(saved == 500){
                        res.status(500);
                        res.sendStatus(500);
                        return;
                    };

                    res.redirect('/');
    
                }else{
                    res.status(400);
                    res.sendStatus(400);
                    return;
                };
            }else{
                res.redirect('/cadastro');
                console.log("User Dosn't exists !");
            }

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };
    async newAccount(req,res){
        try{

            const categories = await categoriesModel.FindAll();
            const errors = req.flash('errors');

            res.render('public/newAccount', { categories,errors });

        } catch(err){
            console.error(err);
            res.sendStatus(500);
            res.status(500);
        };
    };
    async Login(req,res){
        try{

            const categories = await categoriesModel.FindAll();
            const errors = req.flash('errors');
            res.render('public/login', { categories,errors });

        } catch(err){
            console.error(err);
            return 500;
        };
    };

    async newAccount_POST(req,res){
        try{

            const { name,email,number,password } = req.body;
            const user = { name,email,number,password }
            const errors = [];

            const content = [ name,email,number,password ];

            const HasEmpetyItem = ValidationService.HasEmpetyItem(content);
            const HasInvalidItem = ValidationService.HasInvalidItem(content);

            const ok = HasEmpetyItem == false && HasInvalidItem == false;

            if(ok){

                const wasCreated = await usersModel.Create(user);

                if(wasCreated == 500){
                    errors.push("Algo Deu Errado !, Tente Novamente.");
                };

                if(errors.length > 0){
                    req.flash('errors', errors);
                    res.redirect('/cadastro');
                    return;
                };

                res.redirect('/login');

            }else{
                req.flash("errors",["Alguma informacao foi inserida incorretamente !"]);
                res.redirect('/cadastro');
                return;
            }

        } catch(err){
            req.flash('errors', ["Algo Deu Errado !, Tente Novamente."]);
            res.redirect('/cadatro');
        };
    };
    async Login_POST(req,res){
        try{

            const { email,password } = req.body;

            const emailIsEmpty = ValidationService.isEmpyt(email);
            const emailIsValid = ValidationService.isValid(email);

            const passwordIsEmpty = ValidationService.isEmpyt(password);
            const passwordIsValid = ValidationService.isValid(password); 

            const okEmail = emailIsEmpty == false && emailIsValid == true;
            const okPassword = passwordIsEmpty == false && passwordIsValid == true;


            if(okEmail == true && okPassword == true){

                const login = await usersModel.Login(email,password);
                const errors = [];

                if(login == 500){
                    errors.push("Algo Deu Errado !, Tente Novamente.");
                };
                if(login == 404){
                    errors.push("Nao Encontrado !");
                };
                if(login == 401){
                    errors.push("Alguma informacao foi inserida errada !");
                };
                
                if(errors.length > 0){
                    req.flash('errors', errors);
                    res.redirect('/login');
                    return;
                };

                req.session.user = {
                    name: login["name"],
                    email: login["email"],
                    number: login["number"]
                }

                res.redirect('/')

            }else{
                req.flash('errors',["Alguma informacao foi inserida errada !"]);
                res.redirect('/login');
            }

        } catch(err){
            console.error(err);
            req.flash('errors', ["Algo Deu Errado !, Tente Novamente."]);
            res.redirect('/');
        };
    };

};

module.exports = new Public();