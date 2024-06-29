"use strict";

var jwt = require('jsonwebtoken');

// Middleware to authenticate token
exports.authenticateToken = function (req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: 'Invalid token'
    });
  }
};

// Error handling middleware
exports.errorHandler = function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong'
  });
};