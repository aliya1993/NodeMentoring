const cookieParser = (req) => {
  console.log(req.headers.cookie);
  req.parsedCookies = req.cookies;  
}

export default cookieParser