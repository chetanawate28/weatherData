const express = require('express'); 
const router = express.Router();
const commonMethods = require('../common/common-methods')
const config = require('config');
const logger = require('../model/logger/logFile'); 


router.get('/weatherForcast/:cityId/:mode/:tempUnit',function(req,res){
    try {
            //write request to log
            commonMethods.writeRequestObject(req);
            let city = req.params.cityId;
            let responseMode = req.params.mode;
            let tempUnit = req.params.tempUnit;

            let todayDate = new Date(); 
            let todaysutcdatetime = Date.UTC(todayDate.getFullYear(),todayDate.getMonth() + 1,todayDate.getDate(),0,0,0,0);
            let url = config.weatherForcastDetails.url+'?q='+ city +'&mode='+responseMode+'&dt='+todaysutcdatetime+'&units='+tempUnit+'&APPID='+config.weatherForcastDetails.apiKey;
            //http://api.openweathermap.org/data/2.5/forecast?q=Mumbai&mode=json&dt=1575763200000&units=metric&APPID=b17f27b07af08e62ed35a50f3a1b2437
                options = {
                    method: 'get',
                    url: url,            
                    json: true
                };
            

            commonMethods.httpGetPost(options)
                .then(response=>{
                    res.send(commonMethods.successRes(response));
                })
                .catch(err =>{
                    res.send(commonMethods.errorRes(err));
                });
    } catch (err) {
            logger.error(JSON.stringify(err));
            res.send(commonMethods.errorRes('something went wrong'));
    }
});

module.exports = router;