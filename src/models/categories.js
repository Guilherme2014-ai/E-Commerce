const knex = require('../database/connection');

class Categories{

    async FindAll(){
        try {

            return await knex.select('*').table("categories");
            
        } catch(err) { console.error(err) }
    };
    async FindOne(slug){
        try {

            const category = await knex
            .select([ "categories.name as nameC","categories.img as imgC","inventory.*" ])
            .where('categories.slug', slug)
            .innerJoin('inventory','inventory.category_id','categories.id')
            .table("categories");

            /* Join Com 1 Relacao:  Necessita Usar o nome das duas tabelas na frente de cada campo */

            if(category.length == 0 || category == undefined){ return 404 };

            return category;

        } catch(err) {
            console.error(err);
            return 500;
        }
    };
    async Create(data){
        try {

            await knex.insert(data).table('categories');

        } catch(err) {
            console.error(err);
            return 500;
        }
    };

};

module.exports = new Categories();