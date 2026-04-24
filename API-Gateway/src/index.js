const { ServerConfig } = require('./config');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authMiddleware = require('./middlewares/authMiddleware');

const cors = require('cors')
const express = require('express');

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(authMiddleware);

app.use(
  '/authservice',
  createProxyMiddleware({
    target: ServerConfig.AUTH_SERVICE_URL,
    changeOrigin: true,

    pathRewrite: {
      '^/authservice': '/'
    },

    onProxyReq: (proxyReq, req, res) => {
      console.log(`[Gateway] ${req.method} ${req.originalUrl}`);

    if (req.userId) {
        proxyReq.setHeader('x-user-id', req.userId);
    }

    if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
    }
    },

    onError: (err, req, res) => {
      console.error('Proxy Error:', err.message);

      res.status(500).json({
        error: 'Gateway Error'
      });
    }
  })
);

app.get('/', (req, res) => {
  res.send("API GATEWAY IS LIVE!");
});

const PORT = ServerConfig.PORT;

app.listen(PORT, () => {
  console.log(`API GATEWAY IS LIVE ON PORT : ${PORT}`);
});