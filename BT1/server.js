const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('qs');
let handle = {};
handle.notFound = function (req, res) {
    fs.readFile('./view/err/notFound.html', 'utf8', (err, notFoundHtml) => {
        if (err) {
            console.log(err.message)
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(notFoundHtml);
        return res.end()

    })
}
handle.home = function (req, res) {
    fs.readFile('./view/home.html', 'utf8', (err, homeHtml) => {
        if (err) {
            console.log(err.message)
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(homeHtml);
        return res.end()

    })
};

handle.login = function (req, res) {
    if(req.method==='GET'){
        fs.readFile('./view/login.html', 'utf8', (err, loginHtml) => {
            if (err) {
                console.log(err.message)
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(loginHtml);
            return res.end()

        })
    } else {
        let data = '';
        req.on('data', chunk=>{
            data+=chunk;
        })
        req.on('end',()=>{
            const result = qs.parse(data);
            fs.readFile('./view/profile.html', 'utf8',(err, profileHtml)=>{
                if (err){
                    console.log( err)
                }
                profileHtml=profileHtml.replace('{username}',result.username);
                 res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(profileHtml);
                return res.end();
            })
        })
    }




}
let router = {
    '/home': handle.home,
    '/login': handle.login,

};
http.createServer((req, res) => {
    let parsUrl = url.parse(req.url, true);
    let path = parsUrl.pathname;
        let choseHandle = (typeof router[path] !== 'undefined') ? router[path] : handle.notFound;
        choseHandle(req, res)


}).listen(200, () => {
    console.log('http://localhost:200')
})
