const http = require('http');

const url = require('url');

http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    // //get the path
    let path = parseUrl.pathname;
    console.log(path)
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    console.log(trimPath);
    req.on('data', function (data) {
    });
    req.on('end', function (end) {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        let data=
            {
                "trimPath": trimPath
            }
        ;

        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            let payLoadString = JSON.stringify(payload);
            console.log(payLoadString)
            res.writeHead(statusCode)
            res.end(payLoadString);
            //log the request
            console.log("status "+ statusCode + "payload" + payload);
        });

    });

}).listen(4000,()=>{
    console.log( ' http://localhost:4000')
})
//definer the handler

let handlers = {};
//sample handlers
handlers.sample = function (data, callback) {
// call back
    callback(406, {'name': 'sample handle'})
};
//not found sample
handlers.notFound = function (data, callback) {
    callback(404);
};

//home
handlers.home = function (data, callback) {
// call back
    callback(200, 'home page');
};
let router = {
    'sample': handlers.sample,
    'home': handlers.home,
}