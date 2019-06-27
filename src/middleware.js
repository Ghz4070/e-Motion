import jwt from 'jsonwebtoken';
import { secret } from '../src/config';
import { success, error } from '../src/returnjson';

//Variable qui contient un callback express
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
    }

    if(token){
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                return res.json(error('Token is not valid'));
            } else{
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json(error('Auth token is not supplied'));
    }
}

module.exports = {
    checkToken: checkToken
}