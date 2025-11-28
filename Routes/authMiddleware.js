const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";  


const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  
  if (!token) {
    return res.status(403).send("Access Denied. No token provided.");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid or expired token.");
    }
    req.user = user; 
    next();  
  });
};

module.exports = authenticateJWT;
