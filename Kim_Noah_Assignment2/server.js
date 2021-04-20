/* 
Noah Kim Assignment 2 Server
Modified my Assignment 1 server and borrowed code from Lab 14, Prof. Port's screencast
Assignment 1: Borrowed and modified Assignment 1, info_server_Ex4.js (Lab 13) screencasts
*/
// Referred to and modified from Lab 13's Server Side Processing Screencast & Ex4
var data = require('./public/product_data.js'); // Links to product_data.js and sets variable 'data'
var products = data.products; // Loads my product_data.js as var products
const qs = require('qs'); // Use variable 'qs' (query String) as the loaded module
var express = require('express'); // Loads the Express module
var app = express(); // Starts & places Express module to variable 'app'
var myParser = require("body-parser"); // Grants access to POST data and loads the body-parser module

// Borrowed and modified from Lab 14, Prof. Port's screencast 
var filename = 'user_data.json'; // Creates a variable with the file name user_data.json
var fs = require('fs'); // Loads/ starts up fs system actions
const{request} = require('express');

app.all('*', function (req, res, next) { // Links to my request POST
    console.log(req.method + ' to ' + req.path); // Write the request method in the console and path
    next(); // Continue
});

app.use(myParser.urlencoded({ extended: true })); // Retrieves the data from body

// Borrowed and modified from Lab 14, Prof. Port's screencasts 
if(fs.existsSync(filename)) {
    stats = fs.statSync(filename)
    // Load in the user_data file to user_data object!
    console.log(filename + ' has ' + stats.size + ' characters!');
    // Outputs in terminal how many characters or the size of my user data file
    data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(data);
} else {
    console.log(filename + ' does not exist!');
}

// ------------------------ Processing Login ------------------------ // 
// Borrowed and modified from Lab 14 exercise and some from Alyssa Mencel (Fall 2020)
app.post("/process_login", function (req, res, next) {
    var LogError = [];
    console.log(req.query);
    username = req.body.username.toLowerCase(); // Usernames are formatted as lowercase
        if (typeof user_data[username] != 'undefined') { // Username and password should not be undefined
        if (user_data[username].password == req.body.password) {
            req.query.username = username;
            console.log(user_data[req.query.username].name);
            req.query.fullname = user_data[req.query.username].name;
            res.redirect('/invoice.html?' + qs.stringify(req.query));
                // Redirect to invoice if username and password are correct
            return; 
        }  
        else { // If password is incorrect, display 'Invalid Password' message in console
            LogError.push = ('Invalid Password');
            console.log(LogError);
            req.query.username= username;
            req.query.name= user_data[username].name;
            req.query.LogError=LogError.join(';');
        }   
        } else { // If username is incorrect, display 'Invalid Username' message in console
            LogError.push = ('Invalid Username');
            console.log(LogError);
            req.query.username= username;
            req.query.LogError=LogError.join(';');
        }
    res.redirect('./login.html?' + qs.stringify(req.query)); // If error is present, remain on the login page
    });

// -------------- Processing Registration ------------- // 
// Borrowed and modified from Lab 14 //
app.post("/process_register", function (req, res) {
    qstr = req.body
    console.log(qstr);
    var errors = [];
        if (/^[A-Za-z]+$/.test(req.body.name)) { // Only allows letters to be used for full names
        }
        else {
            errors.push('Use Only Letters for Full Name')
        }
        // Validate whether or not it is a full name
        if (req.body.name == "") {
            errors.push('Invalid Full Name');
        }
// Full name character length should be between 0 and 30 
        if ((req.body.fullname.length > 30 && req.body.fullname.length <0)) {
            errors.push('Full Name Too Long')
        }
// Checks the new username in lowercase across other usernames
    var userreg = req.body.username.toLowerCase(); 
        if (typeof user_data[userreg] != 'undefined') { // Gives error if username is taken and displays message 'Username taken'
            errors.push('Username taken')
        }
        // Requires usernames to be letters and numbers 
        if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
        }
        else {
            errors.push('Letters And Numbers Only for Username')
        }
// ------------------------ E-Mail Validation ------------------------ //
// NOTE: The following code will also retain the query string with the order quantities if the user decides to register as a new member from the login page
// Borrowed and modified from Lab 14 // 
    // Password must be at least 6 characters // 
        if (req.body.password.length < 6) {
            errors.push('Password Minimum 6 Characters')
        }
        // Checks to see that the password was entered correctly both times
        if (req.body.password !== req.body.repeat_password) { 
            errors.push('Password Not a Match')
        }
// Borrowed and modified from Lab 14 // 
    // If no errors are present, save username
    // This code also makes the user's fullname, username, and email sticky if there is an error so they don't to retype everything
    req.query.fullname = req.body.fullname;
    req.query.username = req.body.username;
    req.query.email = req.body.email; 
        if (errors.length == 0) {
            console.log('no errors')
            var username = req.body.username;
            user_data[username] = {}; // Register it as user's information
            user_data[username].name = req.body.fullname;
            user_data[username].password= req.body.password; 
            user_data[username].email = req.body.email; 
            data = JSON.stringify(user_data);  // Set as user's information
            fs.writeFileSync(filename, data, "utf-8");
            res.redirect('./invoice.html?' + qs.stringify(req.query));
        }
// Borrowed and modified from Lab 14 // 
    // If errors are present, log the user into the console, redirect to registration page
        else {
            console.log(errors)
// Redirect to registration page if error is present
    req.query.errors = errors.join(';');
    res.redirect('register.html?' + qs.stringify(req.query));
    }
});

// ---------- Processing Purchase and Invoice on the Server ---------- // 
// From my previous Assignment 1 server
app.post("/process_purchase", function (request, response) {
    let POST = request.body; // Data should be in the body

// Check if the quantities are NonNegInt
if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true; // Assumes that the variable is true (has valid quantities)
        var hasquantities = false
        for (i = 0; i < products.length; i++) {
            
qty=POST[`quantity${i}`];
    hasquantities = hasquantities || qty>0; // If value is > 0, then it is valid
    hasvalidquantities = hasvalidquantities && isNonNegInt(qty); // If quantity is both > 0 and valid
    } 
// NOTE: Following code will retain query string from products_display.html page 
// Borrowed from Prof. Port's screencast "Getting Started With Assignment 2"
const stringified = qs.stringify(POST); // If all quantities are valid then go to login.html with query string containing the order quantities
    if (hasvalidquantities && hasquantities) {
        response.redirect("./login.html?" + stringified); 
        // Directs user from products_display.html to login.html with the query string that has the order quantities
    } else { 
        response.redirect("./products_display.html?" + stringified) 
        }
    }
});
// Reusing and repeating the isNonNegInt function from products_display.html
function isNonNegInt(q, return_errors = false) { // Checks to see if inputted values are positive, an integer, or a whole value
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