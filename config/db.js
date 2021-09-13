const mysql  = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

/*var mysqlConnection = mysql.createConnection({
    host:'localhost',
    port:3301,
    user:'root',
    password:'raja2002',
    database:'placement_management',
    multipleStatements : true
});*/

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected...");
    }else{
        console.log(err);
    }
});

module.exports = mysqlConnection;