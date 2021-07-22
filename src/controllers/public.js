class Public{

    Index(req,res){
        res.render("public/index.ejs");
    };

};

module.exports = new Public();