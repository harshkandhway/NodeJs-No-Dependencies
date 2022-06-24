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

        //Choose the handler this request should go to. If one is not found, use the notFound handler
        var choosenHandler = router[trimmedPath] ? router[trimmedPath]: handlers.notFound;

        //Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        //Route the request to the handler specified in the router
        choosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default status code
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

             // Use the payload called back by the handler, or default status payload as object
            payload = typeof(payload) == 'object' ? payload : {};

            //Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            //return the response
            res.writeHead(statusCode);
            res.end(payloadString);
        })
        // // Send the response
        // res.end(buffer)
    })
    
    
    
    // Log the request
    console.log(headers)


    
})

server.listen(3000, ()=>{
    console.log("The server is listening on port 3000 now.");
})
// Start the server, and have it listen on port 3000

// Definig a handlers
var handlers = {}

//sample handler
handlers.sample = function(data, callback){
    //Callback a http status code, and a payload object
    callback(406, {'name' : 'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
};

// Defining a request router
var router = {
    'sample' : handlers.sample
};



