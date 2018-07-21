const http = require('http');
const url = require('url');

http.createServer()
  .on('request', (req, res) => {
    console.log(req.method, req.url);
    let urlParsed = url.parse(req.url, true);   

    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
      res.end(urlParsed.query.message);
    } else {
      res.statusCode = 404;
      res.end("Page not found");
    }
  }).listen(3000);