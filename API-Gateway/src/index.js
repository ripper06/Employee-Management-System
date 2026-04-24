const { ServerConfig} = require('./config');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authMiddleware = require('./middlewares/authMiddleware');

const cors = require('cors')
const express = require('express');

const app = express();

app.use(cors());




console.log('AUTH_SERVICE_URL:', ServerConfig.AUTH_SERVICE_URL);
// PUBLIC ROUTES (no auth)
app.use('/authservice', createProxyMiddleware({
  target: ServerConfig.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/authservice': '' }
}));

// PROTECTED ROUTES
// app.use('/employeeservice',
//   authMiddleware,
//   createProxyMiddleware({
//     target: ServerConfig.EMPLOYEE_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: { '^/employeeservice': '/' },

//     onProxyReq: (proxyReq, req) => {
//       console.log(`[Gateway] ${req.method} ${req.originalUrl}`);

//       if (req.userId) {
//         proxyReq.setHeader('x-user-id', req.userId);
//       }

//       if (req.headers.authorization) {
//         proxyReq.setHeader('Authorization', req.headers.authorization);
//       }
//     }
//   })
// );

// health check
app.get('/', (req, res) => {
  res.send('API GATEWAY IS LIVE!');
});

// global error handler
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = ServerConfig.PORT;

app.listen(PORT, () => {
  console.log(`API GATEWAY IS LIVE ON PORT : ${PORT}`);
});