/* 
Noah Kim: server.js
Borrowed and modified Assignment 1, info_server_Ex4.js (Lab 13) screencasts
*/
// Referred to and modified from Lab 13's Server Side Processing Screencast & Ex4
var data = require('./public/product_data.js'); // Links to product_data.js and sets variable 'data'
var products = data.products; // Loads my product_data.js as var products
const qs = require('qs'); // Use variable 'qs' (query String) as the loaded module
var express = require('express'); // Loads the Express module
var app = express(); // Starts & places Express module to variable 'app'
var myParser = require("body-parser"); // Grants access to POST data and loads the body-parser module

app.all('*', function (request, response, next) { // Links to my request POST
    console.log(request.method + ' to ' + request.path); // Write the request method in the console and path
    next(); // Continue
});
app.use(myParser.urlencoded({ extended: true })); // Retrieve the data from body
app.post("/process_purchase", function (request, response) {
    let POST = request.body; // Data should be in the body

// Check if the quantities are NonNegInt, borrowed code from Alvin Almira (Fall 2020) but modified it
if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true; // Assumes that the variable is true (has valid quantities)
        var hasquantities = false
        for (i = 0; i < products.length; i++) {
            
qty=POST[`quantity${i}`];
    hasquantities = hasquantities || qty>0; // If value is > 0, then it is valid
    hasvalidquantities = hasvalidquantities && isNonNegInt(qty); // If quantity is both > 0 and valid
    } 

// Borrowed from Alyssa Mencel from Fall 2020
const stringified = qs.stringify(POST); // If all quantities are valid then the invoice is generated
    if (hasvalidquantities && hasquantities) {
    response.redirect("./invoice.html?" + stringified); // Utilize invoice.html and inputted data
    }  
    else { 
    response.redirect("./products_display.html?" + stringified) 
        }
    }
});

// Reusing and repeating the isNonNegInt function from products_display.html
function isNonNegInt(q, return_errors = false) { // Checks to see if the inputted values are either positive, an integer, or a whole value
    errors = []; // Assume there are no errors AT FIRST
    if (q == '') q = 0; // Sets blank inputs to the quantity of 0 
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if the string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if the string is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); 
    // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

app.use(express.static('./public')); 
app.listen(8080, () => console.log(`listening on port 8080`)); // Request and instructs to listen on port 8080