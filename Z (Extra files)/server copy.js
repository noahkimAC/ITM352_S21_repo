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
const e = require('express');

// Lab 15 Ex1
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Play with cookies
app.get('set_cookie', function (req, res, next) {
    // console.log(req.cookies);
    let my_name = 'Noah Kim'
    res.cookie('my_name', my_name);
    res.send(`Cookie for ${my_name} sent`);
    next();
});

// Exercise 1a commented out
// var user_data = require('./user_data.json');
// Read user data file
// console.log(user_data['dport']['password']);

var user_data_file = './user_data.json';
if(fs.existsSync(filename)) {
    var file_stats = fs.statSync(filename)
    var user_data = JSON.parse(fs.readFileSync(user_data_file, 'utf-8'));
    // console.log(`${user_data_file} has ${file_stats["size"]} characters`);
} else {
    console.log(`${user_data_file} does not exist!`);
}

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

app.post('/process_register', function (req, res) {
// Lab Example: Add a new user to the database
    username = req.body["username"];
    user_data[username] = {};
    user_data[username]["password"] = req.body["password"];
    user_data[username]["email"] = req.body["email"];
    user_data[username]["fullname"] = req.body["fullname"];
    user_data[username]["repeat_password"] = req.body["repeat_password"];
    user_data[username].email = 'Noah Kim';
    // Save updated user_data to file
    fs.writeFileSync(user_data_file, JSON.stringify(user_data));
    res.send(`${username} is registered`);
})

// Lab Example
app.post('/process login', function (request, response, next) {
    console.log(request.body);
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
    if(typeof user_data[username_entered] != 'undefined') {
        if(user_data[username_entered]['password'] == password_entered) {
            response.send(`${username_entered} is logged in`);
        } else {
            response.send(`${username_entered} password wrong`);
            }
        } else { 
           response.send(`${username_entered} not found`);
        }
    });

// ------------------------ User Registration ------------------------ // 
// Borrowed and modified from Lab 14 exercise & Prof. Port recorded lecture screencast
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
        } else { // If username is incorrect, display 'Invalid Password' message in console
            LogError.push = ('Invalid Username');
            console.log(LogError);
            req.query.username= the_username;
            req.query.LogError=LogError.join(';');
        }
    res.redirect('./login.html?' + qs.stringify(req.query)); // If error is present, remain on the login page
});

// -------------- Creating an account through the server ------------- // 
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
// ------------------------ E-Mail Validation ------------------------ //
// NOTE: The following code will also retain the query string with the order quantities if the user decides to register as a new member from the login page
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
// Borrowed and modified from Lab 14 // 
    // If errors are present, log the user into the console, redirect to registration page
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
// Borrowed from Alyssa Mencel (Fall 2020) & Prof. Port's screencast "Getting Started With Assignment 2"
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