const http = require('http');

const url = require('url');

const StringDecoder = require('string_decoder').StringDecoder;
// lấy query string
console.log(StringDecoder)

http.createServer((req, res) => {

  let  decoder = new StringDecoder('utf8');//đọc data trong request
  let  buffer = '';
  req.on('data',(data)=>{
      buffer+=decoder.write(data)
  })
    req.on('end', function (end) {
        buffer += decoder.end();
        res.end('Hello Node Js');
        console.log(buffer);
    })

}).listen(4000,()=>{
    console.log( ' http://localhost:4000')
})