var http = require('http');

//create a server object:
function request_callback(req, res) {
    console.log(res); //output the request headers to the console
    res.writeHead(200, { 'Content-Type': 'text/html' }); // set MIME type to HTML 
    res.write(`<h1>The server date is: ${Date.now()}</h1>`); //send a response to the client
    res.write('<h1>The client date is: <script>document.write( Date.now() );</script></h1>'); // send another response
    res.end(); //end the response
}    
http.createServer(
request_callback
).listen(8080); //the server object listens on port 8080

console.log('Hello world HTTP server listening on localhost port 8080');
