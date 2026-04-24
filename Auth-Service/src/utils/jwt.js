const jwt = require('jsonwebtoken');
require('dotenv').config();

function generate(payload){
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '60m',
    });
}

function verify(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {
    generate,
    verify
}