const { ServerConfig} = require('./config');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./middlewares/authMiddleware');

const cors = require('cors')
const express = require('express');

const app = express();

app.use(cors());



const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// GLOBAL RATE LIMIT (applies to everything)
app.use(globalLimiter);



// PROXY(AUTH-SERVICE)
app.use('/authservice', createProxyMiddleware({
  target: ServerConfig.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/authservice': '' }
}));

//PROXY(EMPLOYEE-SERVICE)
app.use('/employeeservice',
  authMiddleware,
  createProxyMiddleware({
    target: ServerConfig.EMPLOYEE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/employeeservice': '/' },

    onProxyReq: (proxyReq, req) => {
      console.log(`[Gateway] ${req.method} ${req.originalUrl}`);

      if (req.headers['x-user-id']) {
        console.log("Forwarding:", req.headers['x-user-id']);
        proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
      }

      if(req.headers['x-user-role']){
        console.log("Forwarding Role:", req.headers['x-user-role']);
        proxyReq.setHeader('x-user-role', req.headers['x-user-role']);
      }

      if(req.headers['x-user-email']){
        console.log("Forwarding Email:", req.headers['x-user-email']);
        proxyReq.setHeader('x-user-email', req.headers['x-user-email']);
      }

      if(req.headers['x-user-last-login']){
        console.log("Forwarding Last Login:", req.headers['x-user-last-login']);
        proxyReq.setHeader('x-user-last-login', req.headers['x-user-last-login']);
      }

      if(req.headers['x-user-login-count']){
        console.log("Forwarding Login Count:", req.headers['x-user-login-count']);
        proxyReq.setHeader('x-user-login-count', req.headers['x-user-login-count']);
      }

      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    }
  })
);



//PROXY(LEAVE-SERVICE)
app.use('/leaveservice',
  authMiddleware,
  createProxyMiddleware({
    target: ServerConfig.LEAVE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/leaveservice': '/' },

    onProxyReq: (proxyReq, req) => {
      console.log(`[Gateway] ${req.method} ${req.originalUrl}`);

      if (req.headers['x-user-id']) {
        console.log("Forwarding:", req.headers['x-user-id']);
        proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
      }

      if(req.headers['x-user-role']){
        console.log("Forwarding Role:", req.headers['x-user-role']);
        proxyReq.setHeader('x-user-role', req.headers['x-user-role']);
      }

      if(req.headers['x-user-email']){
        console.log("Forwarding Email:", req.headers['x-user-email']);
        proxyReq.setHeader('x-user-email', req.headers['x-user-email']);
      }

      if(req.headers['x-user-last-login']){
        console.log("Forwarding Last Login:", req.headers['x-user-last-login']);
        proxyReq.setHeader('x-user-last-login', req.headers['x-user-last-login']);
      }

      if(req.headers['x-user-login-count']){
        console.log("Forwarding Login Count:", req.headers['x-user-login-count']);
        proxyReq.setHeader('x-user-login-count', req.headers['x-user-login-count']);
      }

      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    }
  })
);




//DUMMY-API
app.get('/', (req, res) => {
  res.send('API GATEWAY IS LIVE!');
});



// GLOBAL-ERROR HANDLER
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});



const PORT = ServerConfig.PORT;

app.listen(PORT, () => {
  console.log(`API GATEWAY IS LIVE ON PORT : ${PORT}`);
});