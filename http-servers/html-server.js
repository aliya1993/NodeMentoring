const http = require('http');
const fs = require('fs');

http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'html'
    });
    let file = fs.readFileSync('index.html', 'utf8');

    res.write(file.replace('{message}', 'Hello World!'));

    let readStream = fs.createReadStream('index.html');
    process.stdout(readStream);
    //readStream.readable
    //readStream.pipe(transform).pipe(res);
  })
  .listen(3000)