
const cookieParser = (req) => {
  req.parsedCookies = req.cookies;  
}

export default cookieParser