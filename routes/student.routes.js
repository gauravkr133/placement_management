const express               =  require('express');
const router                =  express.Router();
const bcrypt                = require('bcryptjs');
const mysqlConnection       = require("../config/db");


router.get('/',(req,res)=>{
    let sql = `SELECT * FROM student`;
    mysqlConnection.query(sql,(err,result)=>{
        if(!err){
            res.status(200).json({data:result,message:"Success"});
        }else{
            res.status(500).json({error:"Something went wrong....."})
        }
    });
});

router.post('/',(req,res)=>{
    try{

        const {university_regno,name,dob,course,batch,domain,matric_marks,inter_marks,college_marks,blood_group,phone_no,profile_photo,resume} = req.body;
        bcrypt.hash(university_regno,12)
        .then(hashedPassword=>{
            newStudent = [university_regno,name,dob,course,batch,domain,matric_marks,inter_marks,college_marks,blood_group,phone_no,profile_photo,resume,hashedPassword];
            let sql = `INSERT INTO student (university_regno,name,dob,course,batch,domain,matric_marks,inter_marks,college_marks,blood_group,phone_no,profile_photo,resume,password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            mysqlConnection.query(sql,newStudent,(err,result)=>{
                if(!err){
                    res.status(200).json({data:result,message:"Success"});
                }else{
                    res.status(500).json({error:"Something went wrong....."})
                }
            });

        })
        .catch(err=>{
            console.log(err);
        });

    }catch(error){
        console.error(err);
    }
    

});

module.exports = router;