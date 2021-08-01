module.exports = (req,res,next) => {
    const user = req.session.user;

    if(user == undefined || user.rule == 0){
        res.redirect('/');
        console.log('nao admin')
        return;
    };
    console.log('admin')
    next();
};