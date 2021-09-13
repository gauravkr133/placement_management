const express               =  require('express');
const router                =  express.Router();
const bcrypt                = require('bcryptjs');
const mysqlConnection       = require("../config/db");

function checkUser(useremail){
        var count = 0;
        let sql = `SELECT count(*) as count FROM admin WHERE email='${useremail}'`;
        mysqlConnection.query(sql,(err,result)=>{
            if(!err){
                count = result[0].count;
                console.log('inside....',count);
                return count;
            }else{
                return 1;
                //console.log(err);
            }
            
        });

    console.log('function....',count);
    return count;
}

router.post('/create_admin',(req,res)=>{
    const {name,email,password} = req.body;
    
    if(!email || !password || !name ){
        return res.status(422).json({error:"please add all the fields"});
    }

    try{

        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            newAdmin = {
                name:name,
                email:email,
                password:hashedPassword
            }
    
            sql = `INSERT INTO admin set ?`;
            
            mysqlConnection.query(sql,newAdmin,(err,result)=>{
                if(!err){
                    res.status(200).json({message:"Hello admin...."});
                }else{
                    //console.log('error.....');
                    res.status(422).json({error:"Duplicate entry....."})
                }
            });

        })
        .catch(err=>{
            console.log(err);
        });

        

    }catch(error){
        console.log(error);        
    }

    
    
});

module.exports = router;