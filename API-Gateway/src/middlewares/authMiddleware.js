const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../config');

module.exports = (req, res, next) => {
  try {
    const publicRoutes = [
      '/authservice/login',
      '/authservice/signup'
    ];

    const isPublic = publicRoutes.some(route =>
      req.originalUrl.startsWith(route)
    );

    if (isPublic) return next();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token missing' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);


    req.userId = decoded.userId;
    req.role = decoded.role;

    // console.log("auth-middleware userId:", req.userId);
    // console.log("decoded:", decoded);

    // attach to headers for proxy
    req.headers['x-user-id'] = req.userId;

    next();

  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};