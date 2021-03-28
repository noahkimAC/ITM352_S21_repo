var express = require('express');
var app = express ();
app.all('*', function (require, response, next) {
    console.log(require.method);
    next ();
}) 
app.listen(8080);