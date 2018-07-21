const queryStringParser = require('query-string');

const queryParser = (req) => { 
  let queryString = req.url.substring(req.url.indexOf('?') + 1);
  let parsed = queryStringParser.parse(queryString);  
  req.parsedQuery = parsed;
}

export default queryParser