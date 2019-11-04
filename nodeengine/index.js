
const express = require('express');
const app = express();
const compression = require('compression');
const bodyparser = require('body-parser');
const config = require('config');
const logger = require('./model/logger/logger');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authenticaton = require('./api/userLogin');
const weatherData = require('./api/whetherdata');

//jwt secreat key
process.env.SECRET_KEY = 'whetherForcast';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// app.use(compression({ filter: shouldCompress }))

// function shouldCompress(req, res) {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false
//   }

//   // fallback to standard filter function
//   return compression.filter(req, res)
// }

app.get('/healthCheck', (req, res) => {    
  res.send("I am alive and healty!");
})

app.use('/',authenticaton);  
 
app.use('/',function(req,res,next){
  var token=req.body.token || req.headers['authorization'];
  if(token){
      jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
          if(err){
              res.status(500).send('Token Invalid');
          }else{
              next();
          }
      })
  }else{
      res.send('Please send a token')
  }
})

app.use('/',weatherData);  

// Create a server
app.listen(config.socketcon.port, function () {
  try {
    let message = 'This is ' + config.socketcon.name + ' server, Listening on Port ' + config.socketcon.port;
    console.log(message);
  } catch (error) {
    logger.error(JSON.stringify(error));    
  }
});
