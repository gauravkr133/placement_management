const express               =  require('express');
const router                =  express.Router();
const bcrypt                = require('bcryptjs');
const mysqlConnection       = require("../config/db");
const { multipleColumnSet } = require('../utils/common.utils');

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


router.get('/',(req,res)=>{
    let sql = `SELECT * FROM student`;
    mysqlConnection.query(sql,(err,result)=>{
        if(!err){
            if(!result.length){
                res.status(404).json({message:"No records found..."})
            }else{
                res.status(200).json({data:result,message:"Success"});
            }
        }else{
            res.status(500).json({error:"Something went wrong....."})
        }
    });
});

router.get('/:reg_no',(req,res)=>{
    let sql = `SELECT * FROM student WHERE university_regno=?`;
    mysqlConnection.query(sql,[req.params.reg_no],(err,result)=>{
        if(!err){
            if(!result.length){
                res.status(404).json({message:"User not found..."});
            }else{
                res.status(200).json({data:result,message:"Success"});
            }        
        }else{
            res.status(500).json({error:"Something went wrong..."})
        }
    });
});

router.patch('/:reg_no',(req,res)=>{

    let sql = `SELECT * FROM student WHERE university_regno=?`;
    mysqlConnection.query(sql,[req.params.reg_no],(err,result)=>{

        if(!err){

            if(!result.length){

                res.status(404).json({message:"User not found..."});

            }else{

                const {password, ...restOfUpdates } = req.body;
                const {columnSet,values} = multipleColumnSet(restOfUpdates);
                let sql = `UPDATE student SET ${columnSet} WHERE university_regno=?`;
                mysqlConnection.query(sql,[...values,req.params.reg_no],(err,result)=>{
                    if(!err){
                        res.status(200).json({data:result,message:"Updated successfully..."});
                    }else{
                        console.log(err);
                    }
                });

            }   

        }else{
            res.status(500).json({error:"Something went wrong..."})
        }
    });

});



router.delete('/:reg_no',(req,res)=>{
    let sql = `SELECT * FROM student WHERE university_regno=?`;
    mysqlConnection.query(sql,[req.params.reg_no],(err,result)=>{
        if(!err){
            if(!result.length){
                res.status(404).json({message:"User not found..."});
            }else{

                let sql = `DELETE FROM student WHERE university_regno=?`;
                mysqlConnection.query(sql,[req.params.reg_no],(err,result)=>{
                    if(!err){
                        res.status(200).json({data:result,message:"Deleted successfully..."})
                    }else{
                        console.log(err);
                    }
                });

            }        
        }else{
            res.status(500).json({error:"Something went wrong..."})
        }
    });
});





module.exports = router;