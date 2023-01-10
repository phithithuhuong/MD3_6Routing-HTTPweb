const http = require('http');

const url = require('url');

const StringDecoder = require('string_decoder').StringDecoder;
// lấy query string
console.log(StringDecoder)

http.createServer((req, res) => {
    let parseUrl= url.parse(req.url,true);
    let query = parseUrl.query
    res.end('What the fuck ?');
    console.log( query)
}).listen(9000,()=>{
    console.log( ' http://localhost:9000')
})