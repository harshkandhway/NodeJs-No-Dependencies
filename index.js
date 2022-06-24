/** 
 * *Primary file for the API 
 */

// Dependencies
var http = require('http');
var url = require('url')

// The server should respond to all request with a string
var server = http.createServer(function(req,res){
    //Get the url and parse it
    var parsedUrl = url.parse(req.url, true); // true means to call query string module 
    
    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'')

    //get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();

    //Get the headers
    var headers = req.headers
    
    // Send the response
    res.end('Hello World\n');
    
    // Log the request
    console.log(headers)


    
})

server.listen(3000, function(){
    console.log("The server is listening on port 3000 now.");
})
// Start the server, and have it listen on port 3000




