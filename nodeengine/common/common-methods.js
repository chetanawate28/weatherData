
const request = require('request');
const logger = require('../model/logger/logFile')

let commonMethods = {

    httpGetPost: (options) => {

        let promise = new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error)
                    return reject(error);
                else
                    return resolve(body);
            });

        });
        return promise;
    },
    successRes: (res) => {
        return {
            status: true,
            result: res
        }
    },
    errorRes: (err) => {
        return {
            status: false,
            result: err
        }
    },
    writeRequestObject(req){
        let requestLog={
            url: req.protocol + "://" + req.get('host') + req.originalUrl,
            body : req.body,
            authToken:  req.body.token || req.headers['authorization'] || ''
        }
        logger.request(JSON.stringify(requestLog));
    }
}

module.exports = commonMethods;