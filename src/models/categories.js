const knex = require('../database/connection');

class Categories{

    async FindAll(){
        return await knex.select('*').table("categories");
    };

};

module.exports = new Categories();