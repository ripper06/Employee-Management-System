const express = require('express');
const app = express();

const cors = require('cors');

const Routes = require('./routes');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const ServerConfig = require('./config/ServerConfig');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// routes
app.use('/api', Routes);

app.get('/',(req,res)=>{
    res.send("Leave Service Is Live!")
})

// error handler
app.use(globalErrorHandler);


PORT = ServerConfig.PORT || 3003;

app.listen(PORT,(req,res)=>{
    console.log(`Employee Service Running On Port ${PORT}`);
})