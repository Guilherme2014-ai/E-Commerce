const knex = require('../database/connection');

class Users{

    async Create(order){
        try{

            await knex.insert(order).table('orders');

        } catch(err){
            console.error(err);
            return 500;
        }
    };

};

module.exports = new Users();