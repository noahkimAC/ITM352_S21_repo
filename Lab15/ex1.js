var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');
var fs = require('fs');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Play with cookies
app.get('/set_cookie', function (req, res, next) {
    // console.log(req.cookies);
    let my_name = 'Noah Kim';
    // res.clearCookie('my_name');
    res.cookie('my_name', my_name, {maxAge: 5000}); // cookie expires in 5 seconds
    res.send(`Cookie for ${my_name} sent`);
    next();
});

// Play with cookies
app.get('/use_cookie', function (req, res, next) {
    // console.log(req.cookie);
    if(typeof req.cookies["my_name"] != 'undefined') {
    res.send(`Hello ${req.cookies["my_name"]}!`);    
    } else {
        res.send("I don't know you!");
    }
    next();
});

//var user_data = require('./user_data.json');
// Read user data file
var user_data_file = './user_data.json';
if (fs.existsSync(user_data_file)) {
    var file_stats = fs.statSync(user_data_file);
    // console.log(`${user_data_file} has ${file_stats["size"]} characters`);
    var user_data = JSON.parse(fs.readFileSync(user_data_file, 'utf-8'));
} else {
    console.log(`${user_data_file} does not exist!`);
}

app.all('*', function (req, res, next) {
    console.log(req);
    console.log(req.method, req.path);
    next();
});

app.post('/process_register', function (req, res) {
    // add a new user to the DB
    username = req.body["uname"];
    user_data[username] = {};
    user_data[username]["password"] = req.body["psw"];
    user_data[username]["email"] = req.body["email"];
    user_data[username]["name"] = req.body["fullname"];
    // save updated user_data to file (DB)
    fs.writeFileSync(user_data_file, JSON.stringify(user_data));
    res.send(`${username} is registered`);
})

// console.log(user_data);

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

// This processes the login form 
app.post('/process_login', function (request, response, next) {
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
    if (typeof user_data[username_entered] != 'undefined') {
        if (user_data[username_entered]['password'] == password_entered) {
            response.send(`${username_entered} is logged in`);
        } else {
            response.send(`${username_entered} password wrong`);
        }
    } else {
        response.send(`${username_entered} not found`);
    }
});

// This processes the login form 
app.post('/process_register', function (request, response, next) {
    response.send(request.body);
});

app.use(express.static('./static'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });