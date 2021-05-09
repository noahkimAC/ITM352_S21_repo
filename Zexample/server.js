var express = require('express');
var app = express();
var myParser = require("body-parser");
var session = require('express-session');
var products_data = require('./products.json');

app.use(myParser.urlencoded({ extended: true }));
app.use(session({secret: "ITM352 rocks!"}));

app.all('*', function (request, response, next) {
    console.log(`Got a ${request.method} to path ${request.path}`);
    // need to initialize an object to store the cart in the session. We do it when there is any request so that we don't have to check it exists
    // anytime it's used
    if(typeof request.session.cart == 'undefined') { request.session.cart = {}; } 
    next();
});

app.post("/get_products_data", function (request, response) {
    response.json(products_data);
});

app.get("/add_to_cart", function (request, response) {
    var products_key = request.query['products_key']; // get the product key sent from the form post
    var quantities = request.query['quantities'].map(Number); // Get quantities from the form post and convert strings from form post to numbers
    request.session.cart[products_key] = quantities; // store the quantities array in the session cart object with the same products_key. 
    response.redirect('./cart.html');
});

app.get("/get_cart", function (request, response) {
    response.json(request.session.cart);
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
// Example 3: Creating an invoice to both print and email (also example of node mailer component) example
// Add the following to the server.js file from previous example. You may wish to add a “checkout” button or link to this route in the cart.html page.
app.get("/checkout", function (request, response) {
// Generate HTML invoice string
  var invoice_str = `Thank you for your order!<table border><th>Quantity</th><th>Item</th>`;
  var shopping_cart = request.session.cart;
  for(product_key in products_data) {
    for(i=0; i<products_data[product_key].length; i++) {
        if(typeof shopping_cart[product_key] == 'undefined') continue;
        qty = shopping_cart[product_key][i];
        if(qty > 0) {
          invoice_str += `<tr><td>${qty}</td><td>${products_data[product_key][i].name}</td><tr>`;
        }
    }
}
  invoice_str += '</table>';
// Set up mail server. Only will work on UH Network due to security restrictions
  var transporter = nodemailer.createTransport({
    host: "mail.hawaii.edu",
    port: 25,
    secure: false, // use TLS
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  var user_email = 'phoney@mt2015.com';
  var mailOptions = {
    from: 'phoney_store@bogus.com',
    to: user_email,
    subject: 'Your phoney invoice',
    html: invoice_str
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      invoice_str += '<br>There was an error and your invoice could not be emailed :(';
    } else {
      invoice_str += `<br>Your invoice was mailed to ${user_email}`;
    }
    response.send(invoice_str);
  });
 
});