const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const publicRoutes = [
      '/authservice/login',
      '/authservice/signup'
    ];

    if (publicRoutes.includes(req.originalUrl)) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token missing' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info
    req.userId = decoded.userId;
    req.role = decoded.role; // useful later 🔥

    next();

  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};