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
    req.role = decoded.Role;
    req.email = decoded.Email;
    req.lastLogin = decoded.Last_Login;
    req.loginCount = decoded.Login_Count;

    // console.log("auth-middleware userId:", req.userId);
    // console.log("decoded:", decoded);

    // attach to headers for proxy
    req.headers['x-user-id'] = req.userId;
    req.headers['x-user-role'] = req.role;
    req.headers['x-user-email'] = req.email;
    req.headers['x-user-last-login'] = req.lastLogin;
    req.headers['x-user-login-count'] = req.loginCount;

    next();

  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};