const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class Users{

    async FindAll(){
        return await knex.select('*').table("users");
    };
    async Create(user){
        try {
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user["password"],salt);
            user["rule"] = 0;
            user["password"] = hash;

            await knex.insert(user).table('users');

        } catch(err){
            console.error(err);
            return 500;
        }
    }

};

module.exports = new Users();