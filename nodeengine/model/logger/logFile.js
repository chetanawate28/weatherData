
const winston = require('winston');
const fs = require('fs');
const config = require('config');

require('winston-daily-rotate-file');
const { combine, timestamp, label, printf } = winston.format;

//object initialized for dictionary creation.
var tenantIdLoggerArray = {};

//log writing format in file.
const myFormat = printf(info => {
  return `${new Date()} [${info.label}] ${info.level} ${info.message}`;
});

// function initialized for create logger as per tanentId.
var createRequestBasedObject = function (category) {

  let baseurl = (config.logWritePath.lastIndexOf('/') == config.logWritePath.length - 1) ? config.logWritePath : config.logWritePath + '/';
  if (!fs.existsSync( baseurl + '/'+ category + '/')) {
    // Create the directory if it does not exist
    //fs.mkdirSync( './'+tenantIdName +'/log' );
    fs.mkdir( baseurl + '/'+ category + '/', { recursive: true }, (err) => {
      if (err)
        console.log('folder created');
    });
  }
  //it will create new file as per filename and datepattern 
  //maxfiles - it will keep files for 14 days
  const transport = new (winston.transports.DailyRotateFile)({
    filename: category + '-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    dirname: baseurl + '/' + category,
    maxSize: '20m',
    maxFiles: '14d'
  });

  transport.on('rotate', function (oldFilename, newFilename) {
    // this will call  when you are going to write log on next day. 
    //it will comapre oldFilename with newFilename
  });

  //this creates the logger object 
  const logger = winston.createLogger({
    format: combine(
      label({ label: category }),
      timestamp(),
      myFormat
    ),
    transports: [
      transport
    ]
  });

  return logger;
}


var WinstonLevelWiseLog = {
  
  //write error log 
  error: function (msg) {
    tenantIdLoggerArray['error'] = tenantIdLoggerArray['error'] || createRequestBasedObject('error');
    tenantIdLoggerArray['error'].error(msg);
  },

  request: function (msg) {
    tenantIdLoggerArray['request'] = tenantIdLoggerArray['request'] || createRequestBasedObject('request');
    tenantIdLoggerArray['request'].info(msg);
  }
}

module.exports = WinstonLevelWiseLog;