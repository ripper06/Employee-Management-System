const express = require('express');
const app = express();

const cors = require('cors');

const employeeRoutes = require('./routes/employeeRoutes');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

app.use(cors());
app.use(express.json());

// routes
app.use('/employees', employeeRoutes);

app.get('/',(req,res)=>{
    res.send("Employee Service Is Live!")
})

// error handler
app.use(globalErrorHandler);


PORT = 3002
app.listen(PORT,(req,res)=>{
    console.log(`Employee Service Running On Port ${PORT}`);
})