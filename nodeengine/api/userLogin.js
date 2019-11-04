const express = require('express'); 
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const dbConnection = require('../model/sqldb/db-utils');
const commonMethods = require('../common/common-methods');
const logger = require('../model/logger/logFile'); 
    router.post('/login',function(req,res){
            try {
               
                    //write request to log
                    commonMethods.writeRequestObject(req);
                    var username = req.body.username;
                    var password = req.body.password;
                    var param = [username]
                    
                    dbConnection.executeMySqlQuery(config.sqlConfig,'stp_getUser',param,(err,response)=>{
                        if(err)
                        {
                            logger.error(JSON.stringify(err));
                            res.send(commonMethods.errorRes("Error in Connection try again later"));
                            // res.json({
                            //     status:false,
                            //     message:'Error in Connection try again later'
                            //     })
                        }
                        else
                        {
                            let results = response[0]
                            if(results.length >0){
                                let dbPass = results[0].password;                            
                                if(password == dbPass){
                                    let token=  jwt.sign({data:dbPass},process.env.SECRET_KEY,{
                                        expiresIn:"1h"
                                    });
                                    res.send(commonMethods.successRes(token));
                                    // res.json({
                                    //     result:token,
                                    //     status:true
                                    // })
                                }else{
                                    res.send(commonMethods.errorRes("userId and password does not match"));
                                    // res.json({
                                    // status:false,                  
                                    // message:"userId and password does not match"
                                    // });
                                }                        
                            }
                            else{
                                res.send(commonMethods.errorRes("userId does not exits"));
                            // res.json({
                            //     status:false,
                            //     message:"userId does not exits"
                            // });
                            }
                        }
                    });                
            } catch (err) {
                    logger.error(JSON.stringify(err));                    
                    res.send(commonMethods.errorRes('something went wrong.'));
            }
        });

    module.exports = router;