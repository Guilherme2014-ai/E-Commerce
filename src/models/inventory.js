const knex = require('../database/connection');

class Inventory{

    async FindAll(){
        try {

            return await knex.select('*').table('inventory');

        } catch(err) {
            console.error(err);
            return 500;
        };
    };
    async FindOne(id){
        try {

            if(id == undefined || id.length == 0){ return 400 };
            const look = await knex.select('*').where('id',id).table('inventory');
            if(look == undefined || look.length == 0){ return 404 };
            return look;

        } catch(err) {
            console.error(err);
            return 500;
        };
    };
    async DeleteOne(id){
        try {

            if(id == undefined || id.length == 0){ return 400 };
            return await knex.delete().where('id',id).table('inventory');

        } catch(err) {
            console.error(err);
            return 500;
        };
    };
    async UpdateOne(id,update){
        try {

            if(id == undefined || id.length == 0){ return 400 };
            if(update == undefined || update.length == 0){ return 400 };

            return await knex.update(update).where('id',id).table('inventory');

        } catch(err) {
            console.error(err);
            return 500;
        };
    };
    async Create(data){
        try {

            await knex.insert(data).table('inventory');

        } catch(err) {
            console.error(err);
            return 500;
        };
    };

};

module.exports = new Inventory();