const knex = require('../database/connection');

class Users{

    async Create(order){
        try{
            
            await knex.insert(order).table('orders');

        } catch(err){
            console.error(err);
            return 500;
        };
    };
    async FindAll(){
        try{

            return await knex
            .select(['orders.*','inventory.name as nameInventory','inventory.img as imageInventory'])
            .innerJoin('inventory','inventory.id','orders.order_id')
            .table('orders');

        } catch(err){
            console.error(err);
            return 500;
        };
    };
    async FindOne(email){
        try{

            const order = await knex
            .select('*')
            .from('orders')
            .where('email', email);

            return order[0];

        } catch(err){
            console.error(err);
            return 500;
        };
    };

};

module.exports = new Users();