var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');

var products = require('./product_data.json');

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + ' with query' + JSON.stringify(request.query));
    next(); // Go onto next route
});

app.get("/product_data.js", function (request, response, next) {
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.get('/test', function (request, response, next) { // set path location to test
    response.send('I got a request for /test');
});

// This processed the form from order_page.html
app.post('/display_purchase', function (request, response, next) { // set path location to test
    process_quantity_form(request.body, request, response);
});

app.use(express.static('./public')); // sets up response to get requests to a particular path sets up a static web server

app.listen(8080, function () {
    console.log(`listening on port 8080`)
}
); // note the use of an anonymous function here

function isNonNegInt(q, return_errors = false) { // Checks to see if the inputted values are either positive, an integer, or a whole value
    var errors = []; // Assume there are no errors AT FIRST
    if (q == '') q = 0; // Sets blank inputs to the quantity of 0 
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if the string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if the string is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); 
    // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

function process_quantity_form(post_data, request, response) {
    if (post_data['quantity_textbox']) {
        the_qty = post_data['quantity_textbox'];
        let prod_num = post_data['product_select'];
        let model = products[prod_num]['model'];
        let model_price = products[prod_num]['price'];

        if(isNonNegInt(the_qty)) {
            response.send(`<h2>Thank you for purchasing ${the_qty} ${model}. Your total is \$${the_qty * model_price}!</h2>`)
            return; // Finish responding
        }
        else {
            response.redirect('./order_page.html?quantity_textbox='+the_qty); // Redirect to same page
            return;
        }
    }    
}