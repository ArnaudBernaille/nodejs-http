
const http = require('http');

const hostname = 'localhost';
const port = 3000;
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  if (req.method == 'GET') {

    console.log('Request get');

    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    var filePath = path.resolve('./'+fileUrl); // SI fileUrl contiend la valeur "/index.html" alors on ne va 
    const fileExt = path.extname(filePath);


  console.log(filePath);
    
    if (fileExt == '.html') {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + 
                      ' not found</h1></body></html>');
          return;
        }
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    }
    
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl + 
              ' not a HTML file</h1></body></html>');
    }
    
  }
  else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method + 
              ' not supported</h1></body></html>');
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});