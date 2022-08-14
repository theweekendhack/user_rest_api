const { Client } = require('pg');
const db = new Client({
  host: 'localhost',
  port: 5432,
  user: 'kb-rithm',
  database: 'user_api'
})


db.connect()
.then(()=>console.log("Connected to db"))
.catch(err=>console.log("Error",err))

module.exports =db;



