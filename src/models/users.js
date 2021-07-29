const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class Users{

    async FindAll(){
        return await knex.select('*').table("users");
    };
    async FindOne(email){
        try{

            const user = await knex.select('*').where('email',email).table('users');

            if(user == undefined || user.length == 0){ return 404 };

            return user[0];

        } catch(err){
            console.error(err);
            return 500;
        }
    }
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
        };
    };
    async Login(email,password){
        try{

            const user = await this.FindOne(email);

            if(user == 404){ return 404 };

            const auth = await bcrypt.compare(password,user["password"]);

            if(auth){ return user }else{ return 401 }

        } catch(err){
            console.error(err);
            return 500;
        }
    };

};

module.exports = new Users();