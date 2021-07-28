const knex = require('../database/connection');

class Inventory{

    async FindOne(id){
        try {

            if(id == undefined || id.length == 0){ return 400 };
            return await knex.select('*').where('id',id).table('inventory');

        } catch(err) {
            console.error(err);
            return 500;
        };
    };

};

module.exports = new Inventory();