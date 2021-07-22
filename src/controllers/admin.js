class Admins{

    Index(req,res){
        res.render('admin/index')
    };

};

module.exports = new Admins();