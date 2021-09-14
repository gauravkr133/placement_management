const express               =  require('express');
const router                =  express.Router();
const mysqlConnection       = require("../config/db");
const { multipleColumnSet } = require('../utils/common.utils');

router.post('/',(req,res)=>{
    try {
        const{company_name,company_email,company_location,company_type} = req.body;
        let sql = `INSERT INTO company_details(company_name,company_email,company_location,company_type) VALUES(?,?,?,?)`;
        let newCompany = [company_name,company_email,company_location,company_type];
        mysqlConnection.query(sql,newCompany,(err,result)=>{
            if(!err){
                res.status(200).json({data:result,message:"Successfully inserted..."});
            }else{
                console.log(err);
            }
        });
    } catch(error){
        console.log(error);
    }
});

router.get('/',(req,res)=>{
    try {
        let sql = `SELECT * FROM company_details`;
        mysqlConnection.query(sql,(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."})
                }else{
                    res.status(200).json({data:result,message:"Success"});
                }
            }else{
                console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/:company_id/:company_name',(req,res)=>{
    try {
        let sql = `SELECT * FROM company_details WHERE company_id = ? AND company_name = ?`;
        mysqlConnection.query(sql,[req.params.company_id,req.params.company_name],(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    res.status(200).json({data:result,message:"Success"});
                }
            }else{
                console.log(err);
            }
        })
    } catch(error){
        console.log(error);
    }
});

router.patch('/:company_id/:company_name',(req,res)=>{
    try{
        let sql = `SELECT * FROM company_details WHERE company_id = ?`;
        mysqlConnection.query(sql,[req.params.company_id],(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    const{company_id,...restOfUpdates} = req.body;
                    const {columnSet,values} = multipleColumnSet(restOfUpdates);
                    let sql = `UPDATE company_details SET ${columnSet} WHERE company_id=?`;
                    mysqlConnection.query(sql,[...values,req.params.company_id],(err,result)=>{
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

router.delete('/:company_id',(req,res)=>{
    try {
        let sql = `SELECT * FROM company_details WHERE company_id = ?`;
        mysqlConnection.query(sql,[req.params.company_id],(err,result)=>{
            if(!err){
                if(!result.length){
                    res.status(404).json({message:"No records found..."});
                }else{
                    let sql = `DELETE FROM company_details WHERE company_id = ?`;
                    mysqlConnection.query(sql,[req.params.company_id],(err,result)=>{
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
    } catch (error) {
        console.log(error);   
    }
});

module.exports = router;