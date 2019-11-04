
const mysql = require('mysql');

// Fetch data example


exports.executeMySqlQuery = function(connConfig, sqlQuery, params,callback) {

  let _connection = mysql.createConnection({
    host: connConfig.host,
    user: connConfig.user,
    password: connConfig.password,
    database:connConfig.database
  });
  _connection.connect(function(err) {
    if (err) {callback(err); return;}; // not connected!
    if(params != undefined && params.length != 0)
    {
        let strParam = '';
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            strParam += "'"+ element + "',";
          }
    
          strParam =strParam.substr(0,strParam.length -1);
          sqlQuery = "CALL "+ sqlQuery + "(" + strParam + ")";
    }
    else{
        sqlQuery = "CALL "+ sqlQuery + "()";
    }

        // Use the connection
        _connection.query(sqlQuery, function (error, result, fields) {
        // When done with the connection, release it.
       _connection.destroy();

        // Handle error after the release.
        if (error) {callback(err);return;};

          callback(null, result);
        // Don't use the connection here, it has been returned to the pool.
        }); 
  });
};
