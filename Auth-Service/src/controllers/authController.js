const {AuthService} = require('../services');
const {AppError} = require('../utils')

const ALLOWED_ROLES = ['ADMIN', 'HR', 'EMPLOYEE'];

const signup = async (req,res,next)=>{
    
    try {
        console.log(req);
        let { email, password, role } = req.body;

        if (!email || !password || !role) {
            throw new AppError("Missing fields in signup!", 400);
        }

        role = role.toUpperCase();

        if (!ALLOWED_ROLES.includes(role)) {
            throw new AppError("Invalid role. Allowed roles: ADMIN, HR, EMPLOYEE", 400);
        }

        const user = await AuthService.signup(req.body);

        res.status(201).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
}

const login =async(req,res,next) =>{
    
    try {
        let { email, password} = req.body;

        //console.log(email,password);
        
        if (!email || !password) {
            throw new AppError("Missing fields in login!", 400);
        }

        const data = await AuthService.login({email,password});
        res.status(201).json({
            message : "success",
            token : data,
        })
    } catch (error) {
        next(error);
    };
}

module.exports = {
    signup,
    login
}