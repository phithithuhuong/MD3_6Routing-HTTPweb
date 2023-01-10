const http = require('http');
const fs = require('fs');
const qs = require('qs');
const url = require('url');
let handleRouter = {}
handleRouter.err = function (req, res) {
    fs.readFile('./view/err.html', 'utf8', (err, errHtml) => {
        if (err) {
            console.log(err.message)
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(errHtml);
        return res.end()
    })

}
handleRouter.calculator = function (req, res) {
    fs.readFile('./view/calculator.html', 'utf8', (err, calculatorHtml) => {
        if (err) {
            console.log(err.message)
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(calculatorHtml);
        return res.end()
    })

}
handleRouter.result = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        data = qs.parse(data);
        let a = Number(data.a);
        let b = Number(data.b);
        let sum = 0
        switch (data.math) {
            case '+':
                sum = (a + b)
                break;
            case '-':
                sum = (a - b)
                break;
            case 'x':
                sum = (a * b)
                break;
            case '/':
                sum = (a / b);
                break;


        }
        fs.readFile('./view/result.html', 'utf8',(err, resultHtml)=>{
            if (err){
                console.log(err.message)
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            resultHtml= resultHtml.replace('{result}',sum)
            res.write(resultHtml)
            return res.end()
        })

    })

}
let router = {
    '/calculator':handleRouter.calculator,
    '/result': handleRouter.result
}


http.createServer((req, res) => {
    let parseUrl = url.parse(req.url,true);
    let path = parseUrl.pathname;
    if (req.method=='GET'){
        let  choseHandle = (typeof router[path]!=='undefined')?router[path]: handleRouter.err ;
        choseHandle(req,res)
    }else {
        let choseHandle= handleRouter.result
        console.log(typeof choseHandle)
        choseHandle(req,res)

    }
    //code
}).listen(5000, () => {
    console.log('Server is running http://localhost:5000/calculator')
})