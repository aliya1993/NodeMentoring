const http = require('http');
const fs = require('fs');

const product = {
   id: 1,
   name: 'Supreme T-Shirt',
   brand: 'Supreme',
   price: 99.99,
   options: [
       { color: 'blue' },
       { size: 'XL' }
   ]
};

http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'JSON'
    });
     res.end(JSON.stringify(product));
  })
  .listen(3000)