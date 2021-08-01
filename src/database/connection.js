const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'sql10.freesqldatabase.com',
      user : 'sql10428635',
      password : '4y2J7LWyxR',
      database : 'sql10428635'
    }
});

module.exports = knex;