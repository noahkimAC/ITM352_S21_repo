/* 
Copied from Assignment 1 example video and info_server_Ex4.js from Lab13
Noah Kim's Assignment 1: Server
*/

var data = require('product_data.js'); //load products.js file and set to variable 'data'
var products_array = data.products; //set variable 'products_array' to the products array in the products.js file
const queryString = require('query-string'); //read variable 'queryString' as the loaded query-string module
var express = require('express'); //load and cache express module
var app = express(); //set module to variable 'app'
var myParser = require("body-parser"); //load and cache body parser module

app.all('*', function (request, response, next) { //for all request methods...
    console.log(request.method + ' to ' + request.path); //write in the console the request method and its path
    next(); //move on
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body

app.post("/process_purchase", function (request, response) {
    let POST = request.body; // data would be packaged in the body

    //check if quantities are nonnegative integers 
    if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities=true; // creating a varibale assuming that it'll be true
        var hasquantities=false
        for (i = 0; i < products.length; i++) {
            
                        qty=POST[`quantity${i}`];
                        hasquantities=hasquantities || qty>0; // If it has a value bigger than 0 then it is good
                        hasvalidquantities=hasvalidquantities && isNonNegInt(qty);    // if it is both a quantity over 0 and is valid    
        } 
        // if all quantities are valid, generate the invoice// 
        const stringified = queryString.stringify(POST);
        if (hasvalidquantities && hasquantities) {
            response.redirect("./invoice.html?"+stringified); // using the invoice.html and all the data that is input
        }  
        else { 
            response.redirect("./products_display.html?" + stringified) 
        }
    }
});

//repeats the isNonNegInt function from the products_display.html file 
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if the string is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integer
    return returnErrors ? errors : (errors.length == 0);
}

app.use(express.static('./public')); // root in the 'public' directory so that express will serve up files from here
app.listen(8080, () => console.log(`listening on port 8080`)); //run the server on port 8080 and show it in the console