const jwt = require('jsonwebtoken');
require('dotenv').config();

function generate(payload){
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '120m'
        });
    } catch (error) {
        console.error("JWT Error:", error);
        throw error;
    }
}

function verify(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {
    generate,
    verify
}