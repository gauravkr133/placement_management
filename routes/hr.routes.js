const express               =  require('express');
const router                =  express.Router();
const mysqlConnection       = require("../config/db");
const { multipleColumnSet } = require('../utils/common.utils');

router.post('/',(req,res)=>{
    try{
        const{company_id,hr_name,hr_number,hr_email} = req.body;
        let sql = `INSERT INTO hr_details (company_id,hr_name,hr_number,hr_email) VALUES (?,?,?,?)`;
        newHr = [company_id,hr_name,hr_number,hr_email];
        mysqlConnection.query(sql,newHr,(err,result)=>{
            if(!err){
                res.status(200).json({data:result,message:"Successfully Inserted"});
            }else{
                console.log(err);
            }
        });

    }catch(error) {
        console.log(error);
    }
});

router.get('/',(req,res)=>{
    try{
        let sql = `SELECT * FROM hr_details`;
        mysqlConnection.query(sql,(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    res.status(200).json({data:result,message:"Success"});
                }
            }else{
                console.log(err);
            }
        });
    }catch(error){
        console.log(error);
    }
});

router.get('/:hr_id',(req,res)=>{
    try{
        let sql = `SELECT * FROM hr_details WHERE hr_id = ?`;
        mysqlConnection.query(sql,[req.params.hr_id],(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    res.status(200).json({data:result,message:"Success"});
                }
            }else{
                console.log(err);
            }
        });
    }catch(error){
        console.log(error);
    }
});

router.patch('/:hr_id',(req,res)=>{
    try{
        let sql = `SELECT * FROM hr_details WHERE hr_id = ?`;
        mysqlConnection.query(sql,[req.params.hr_id],(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    const{hr_id,...restOfUpdates} = req.body;
                    const {columnSet,values} = multipleColumnSet(restOfUpdates);
                    let sql = `UPDATE hr_details SET ${columnSet} WHERE hr_id=?`;
                    mysqlConnection.query(sql,[...values,req.params.hr_id],(err,result)=>{
                        if(!err){
                            res.status(200).json({data:result,message:"Updated successfully..."});
                        }else{
                            console.log(err);
                        }
                    });
                }
            }else{
                console.log(err);
            }
        });
    }catch(error){
        console.log(error);
    }
});

router.delete('/:hr_id',(req,res)=>{
    try{
        let sql = `SELECT * FROM hr_details WHERE hr_id = ?`;
        mysqlConnection.query(sql,[req.params.hr_id],(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    let sql = `DELETE FROM hr_details WHERE hr_id = ?`;
                    mysqlConnection.query(sql,[req.params.hr_id],(err,result)=>{
                        if(!err){
                            res.status(200).json({data:result,message:"Deleted successfully..."});
                        }else{
                            console.log(err);
                        }
                    });
                }
            }else{
                console.log(err);
            }
        });
    }catch(error){
        console.log(error);
    }
});

module.exports = router;