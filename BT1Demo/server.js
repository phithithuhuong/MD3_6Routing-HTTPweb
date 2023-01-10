
var http = require('http');
var url = require('url');
let fs = require('fs');
let qs = require('qs');


let server = http.createServer(function (req, res) {
    //get url and parse
    var parseUrl = url.parse(req.url, true);
    //
    // //get the path
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '');

    var method = req.method.toLowerCase();

    if(method=='get'){
        var chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        chosenHandler(req, res);
    }
    else{
        var chosenHandler = router.profile;
        chosenHandler(req, res);
    }
});


server.listen(3000, function () {
    console.log('server running at localhost:3000 ')
});

let handlers = {};
// form login
handlers.login = function (rep, res) {
    fs.readFile('./view/login.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// home page
handlers.home = function (rep, res) {
    fs.readFile('./view/home.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// not found
handlers.notFound = function (rep, res) {
    fs.readFile('./view/notfound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
// profile
handlers.profile = function (req, res){
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data= qs.parse(data);
        let name = data.name;
        let stringObject = "<h1>Hello " + name + "</h1>";
        console.log(name);
        fs.writeFile('./view/profile.html', stringObject,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Ghi du lieu vao file thanh cong!");
            console.log("Doc du lieu vua duoc ghi");

            fs.readFile('./view/profile.html', function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        });
    });
}
//definer the request router
let router = {
    'home': handlers.home,
    'login': handlers.login,
    'profile':handlers.profile
}
