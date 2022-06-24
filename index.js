/** 
 * *Primary file for the API 
 */

// Dependencies
var http = require('http');
var url = require('url')
var StringDecoder = require('string_decoder').StringDecoder;

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

    //parse the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',(data)=>{
        console.log(data)
        buffer+=decoder.write(data);
        console.log(buffer)
    })

    req.on('end',()=>{
        buffer+=decoder.end();
        // Send the response
        res.end(buffer)
    })
    
    
    
    // Log the request
    console.log(headers)


    
})

server.listen(3000, ()=>{
    console.log("The server is listening on port 3000 now.");
})
// Start the server, and have it listen on port 3000




