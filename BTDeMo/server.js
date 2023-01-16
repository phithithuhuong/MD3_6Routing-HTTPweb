const http = require('http');
const fs = require('fs');
const qs = require('qs');
const url = require('url')
let handle = {};
handle.calculator = function (req, res) {
    fs.readFile('./view/calculator1.html', 'utf-8', (err, calculatorHtml) => {

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(calculatorHtml);
        res.end();
    })
}
handle.result = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        data = qs.parse(data);
        console.log(data)
        let a = Number(data.a)
        let b = Number(data.b)
        let sum=0
        switch (data.math){
            case '+':
                sum= (a+b);
                break;
            case '-':
                sum= (a-b);
                break;
            case 'x':
                sum= (a*b);
                break;
            case '/':
                sum= (a/b);
                break;

        }
        res.end(`Result : ${sum}`)
    })

}

handle.notFound = function (req, res) {
    return res.end(`<h1>Not Found</h1>`)
}
let router = {
    '/calculator': handle.calculator,
    '/result': handle.result
}

http.createServer((req, res) => {
    let urlParse = url.parse(req.url, true);
    let path = urlParse.pathname;
    console.log(path)
    if (req.method === 'GET') {
        let chooseHandle = (typeof router[path] !== 'undefined') ? router[path] : handle.notFound;
        chooseHandle(req, res)
    } else {
        let chooseHandle = handle.result;
        chooseHandle(req, res)
    }

}).listen(3000, () => {
    console.log('http://localhost:3000/calculator')
})