const http = require('http');
const fs = require('fs');
const url = require('url');
let handle={};
handle.product= function (req,res) {
    fs.readFile('./view/product.html','utf8',(err, productHtml)=>{
        if (err){
            console.log(err.message)
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(productHtml)
        return res.end()
    })

}
handle.user= function (req,res) {
    fs.readFile('./view/user.html','utf8',(err, userHtml)=>{
        if (err){
            console.log(err.message)
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(userHtml)
        return res.end()
    })

}
handle.notFound= function (req,res) {
    fs.readFile('./view/err/notFound.html','utf8',(err, notFoundHtml)=>{
        if (err){
            console.log(err.message)
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(notFoundHtml)
        return res.end()
    })

}

let router = {
    'product': handle.product,
    'user': handle.user
}
http.createServer((req, res) => {
    let parseUrl = url.parse(req.url,true)
    console.log(parseUrl,1);
    let path = parseUrl.pathname;
    console.log(path,2);
    let trimPath = path.replace(/^\/+|\/+$/g,'');
    console.log(trimPath,3);
    let choseHandle= (typeof (router[trimPath]!=='undefined'))? router[trimPath] : handle.notFound;
      choseHandle(req,res)

}).listen(3030,()=>{
    console.log('http://localhost:3030')
})
