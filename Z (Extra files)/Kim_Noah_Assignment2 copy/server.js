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

app.all('*', function (request, response, next) { // Links to my request POST
    console.log(request.method + ' to ' + request.path); // Write the request method in the console and path
    next(); // Continue
});

app.use(myParser.urlencoded({ extended: true })); // Retrieve the data from body

// Borrowed and modified from Lab 14, Prof. Port's screencasts 
if (fs.existsSync(filename)) { // Checks to see if the filename exists
    stats = fs.statSync(filename) // Retrives the data from user_data.json
    console.log(filename + 'has' + stats.size + 'characters'); // Records the amount of characters in the console 

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
} else { 
    console.log(filename + 'does not exist!'); // If the filename does not exist, display this message in the server
}

// ----------------------------- User Registration ----------------------------- // 
// Borrowed and modified from Lab 14 exercise and some from Alyssa Mencel (Fall 2020)
app.post("/process_login", function (req, res) {
    var LogError = [];
    console.log(req.query);
    the_username = req.body.username.toLowerCase(); // Usernames are formatted as lowercase
        if (typeof users_reg_data[the_username] != 'undefined') { // Username and password should not be undefined
        if (users_reg_data[the_username].password == req.body.password) {
            req.query.username = the_username; 
            console.log(users_reg_data[req.query.username].name);
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/invoice.html?' + qs.stringify(req.query));
                // Redirect to invoice if username and password are correct
            return; 
        } else { // If password is incorrect, display 'Invalid Password' message in console
            LogError.push = ('Invalid Password');
            console.log(LogError);
            req.query.username= the_username;
            req.query.name= users_reg_data[the_username].name;
            req.query.LogError=LogError.join(';');
        }
        } else { // If username is incorrect, display 'Invalid Password' message in     console
            LogError.push = ('Invalid Username');
            console.log(LogError);
            req.query.username= the_username;
            req.query.LogError=LogError.join(';');
        }
    res.redirect('./login.html?' + qs.stringify(req.query)); // If error is present, remain on the login page
});

// ------------------- Creating an account through the server ------------------ // 
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
// Full name character length should be between 0 and 25 
        if ((req.body.fullname.length > 25 && req.body.fullname.length <0)) {
        errors.push('Full Name Too Long')
        }
// Checks the new username in lowercase across other usernames
    var reguser = req.body.username.toLowerCase(); 
        if (typeof users_reg_data[reguser] != 'undefined') { // Gives error if username is undefined and display message 'Username taken'
        errors.push('Username taken')
        }
        // Requires usernames to be letters and numbers 
        if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
        }
        else {
        errors.push('Letters And Numbers Only for Username')
        }
// ----------------------------- E-Mail Validation ----------------------------- //
// Borrowed and modified from Lab 14 // 
    // Password must be at least 6 characters // 
    if (req.body.password.length < 6) {
      errors.push('Password Too Short')
    }
    // Checks to see that the password was entered correctly both times
    if (req.body.password !== req.body.repeat_password) { 
      errors.push('Password Not a Match')
    }
// Borrowed and modified from Lab 14 // 
    // If no errors are present, save username 
    if (errors.length == 0) {
      POST = req.body
      console.log('no errors')
      var username = POST['username']
      users_reg_data[username] = {}; // Register it as user's information
      users_reg_data[username].name = username;
      users_reg_data[username].password= POST['password']; // POST user's password
      users_reg_data[username].email = POST['email']; // POST user's email
      data = JSON.stringify(users_reg_data);  // Make it to user's information
      fs.writeFileSync(filename, data, "utf-8");
      res.redirect('./invoice.html?' + qs.stringify(req.query));
    }
// If errors are present, log the user into the console, redirect to registration page
// Borrowed and modified from Lab 14 // 
    if (errors.length > 0) {
        console.log(errors)
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.repeat_password = req.body.repeat_password;
        req.query.email = req.body.email;
// Redirect to registration page if error is present
        req.query.errors = errors.join(';');
        res.redirect('register.html?' + qs.stringify(req.query));
    }
});

// --------------- Processing Purchase and Invoice on the Server --------------- // 
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