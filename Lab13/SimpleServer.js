var http = require('http'); // load in HTTP package

//create a server object:
http.createServer(function (req, res) { // createServer method that listens for http requests at an address at a certain port
    // creates event while loop, server keeps running listening for rqsts on port 8080
    console.log(req.headers); //output the request headers to the console -- call back function: function as an argument to another function
    res.writeHead(200, { 'Content-Type': 'text/html' }); // set MIME type to HTML 
    res.write(`<h1>The server date is: ${Date.now()}</h1>`); //send a response to the client
    res.write('<h1>The client date is: <script>document.write( Date.now() );</script></h1>'); // send another response
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

console.log('Hello world HTTP server listening on localhost port 8080');
