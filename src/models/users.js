const knex = require('../database/connection');

class Users{

    async FindAll(){
        return await knex.select('*').table("users");
    };

};

module.exports = new Users();