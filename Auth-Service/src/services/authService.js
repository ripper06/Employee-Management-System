const {UserCredentialRepository,UserRepository} = require('../repositories');
const {AppError} = require('../utils');
const {JWT} = require('../utils');

const bcrypt = require('bcrypt');

class AuthService {

    async signup(data){
        const email = data.email.toLowerCase().trim();
        const role = data.role.toUpperCase().trim();

        const existing = await UserRepository.findByEmail(email);
        
        if(existing){
            throw new AppError("User already exists!", 400);
        }

        const user = await UserRepository.create({
            email : email,
            role : role
        });

        const hash = await bcrypt.hash(data.password, 10);

        await UserCredentialRepository.create({
            user_id : user.id,
            password_hash : hash
        });

        return user;
    }

    async login(data){

        const email = data.email.toLowerCase().trim();

        const user = await UserRepository.findByEmail(email);

        if(!user) throw new AppError("Email is not registered!", 400);

        const cred = await UserCredentialRepository.findByUserId(user.id);

        const valid = await bcrypt.compare(data.password,cred.password_hash);

        if(!valid) throw new AppError("Invalid password!",401);

        const now = new Date();
        //console.log("SETTING last_login_at:", now);

        await UserRepository.update(user.id,{
            last_login_at: now,
            login_count : user.login_count + 1
        })

        const token = JWT.generate({
            userId : user.id, 
            Email:user.email, 
            Role: user.role, 
            Last_Login: user.last_login_at ,
            Login_Count: user.login_count
        });

        return {token};
    }
}

module.exports = new AuthService();

