import pkg from 'jsonwebtoken';
const { verify } = pkg;

// Middleware to authenticate token
export function authenticateToken(req, res, next) {
  //console.log("in middleware");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    //console.log("for NExt");
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Invalid token' });
  }
}

// Error handling middleware
export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
}
