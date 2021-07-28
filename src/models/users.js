const knex = require('../database/connection');

class Users{

    async FindAll(){
        return await knex.select('*').table("users");
    };
    async Create(user){
        try {
            user["rule"] = 0
            // user['password'] = 
            await knex.insert(user).table('users');

        } catch(err){
            console.error(err);
            return 500;
        }
    }

};

module.exports = new Users();