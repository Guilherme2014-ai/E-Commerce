const knex = require('../database/connection');

class Admins{

    async Index(req,res){
        try{

            res.render('admin/index')

        } catch(err){
            console.error(err)
        }
    };
    async Users(req,res){
        try{
            const users = await knex.select('*').table('users');
            
            res.render('admin/users', { users })

        } catch(err){
            console.error(err)
        }
    }

};

module.exports = new Admins();