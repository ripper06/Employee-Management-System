const express = require('express');
require('dotenv').config();
const ErrorHandler = require('./middlewares/errorHandler')
const authRoutes = require('./routes')
const cors = require('cors');

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api', authRoutes);

app.get('/',(req,res)=>{
    res.end("API IS LIVE!")
})

app.use(ErrorHandler);

app.listen(3001, () => console.log('Auth Service running'));