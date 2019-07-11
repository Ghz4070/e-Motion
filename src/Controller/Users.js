import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {success, error} from '../returnjson';
import {secret} from '../config';

export function addUser() {
    return (req, res) => {
        req.sql.query('SELECT * FROM users WHERE username = ? UNION SELECT * FROM users WHERE email = ?', [req.body.username, req.body.email])
            .then((resultSelectUsername) => {
                if (resultSelectUsername.length > 0) {
                    res.json(error('This username is used'));
                } else {
                    let nullField = false;

                    for (let key of Object.entries(req.body)) {
                        if (key[1] == "" && key[0] != 'pointFidelity' || key[1] == null && key[0] != 'pointFidelity') {
                            nullField = true;
                        }
                    }

                    if (nullField) {
                        res.json(error(new Error('One file empty').message))
                    } else {
                        bcrypt.genSalt(10)
                            .then((salt) => {
                                bcrypt.hash(req.body.password, salt)
                                    .then((hash) => {
                                        req.sql.query('INSERT INTO users (firstname, lastname, birthday, address, phoneNumber, driverLicence, roles,' +
                                            'password, email, username) VALUES (?,?,?,?,?,?,?,?,?,?)',
                                            [req.body.firstname, req.body.lastname, req.body.birthday, req.body.address, req.body.phoneNumber, req.body.driverLicence,
                                                'ROLE_USER', hash, req.body.email, req.body.username])
                                            .then((resultInsert) => {
                                                res.json(success(resultInsert));
                                            })
                                            .catch((errInsert) => res.json(error(errInsert.message)))
                                    })
                                    .catch((err) => res.json(err.message))
                            })
                            .catch((err) => res.json(error(err.message)))
                    }
                }
            })
            .catch((errSelect) => res.json(error(errSelect.message)))
    }
}

export function login() {
    return (req, res) => {
        req.sql.query('SELECT username, password, roles FROM users WHERE username = ?', req.body.username)
            .then((result) => {
                if (result.length < 1) {
                    res.json(error('Unknown username'));
                } else {
                    bcrypt.compare(req.body.password, result[0].password)
                        .then((passwordDecrypted) => {
                            if (passwordDecrypted && req.body.username === result[0].username) {
                                let token = jwt.sign({username: req.body.username, role:result[0].roles}, secret, {
                                    algorithm: 'HS256',
                                    expiresIn: '24h'
                                }, (err, encoded) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    }
                                    res.json(success(encoded));
                                })
                            }
                        })
                        .catch((err) => res.json(error(err.message)))
                }
            })
            .catch((err) => res.json(error(err.message)))
    }
}


export function seeInformationAccount() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);
        req.sql.query('SELECT * FROM users WHERE username = ?', [decodeToken.username])
        .then((resultQuery) => {
            res.json(success(resultQuery));
        })
        .catch((err) => res.json(error(err)))
    }
}

export function updateInformationAccount() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);
        if(decodeToken.role == "ROLE_USER" || decodeToken.role == "ROLE_POPRIO"){
            req.sql.query('SELECT firstname, lastname, birthday, address, phoneNumber, driverLicence FROM users WHERE username = ?', [decodeToken.username])
            .then((resultSelect) => {
                let firstname = req.body.firstname == '' ?  resultSelect[0].firstname : req.body.firstname ;
                let lastname = req.body.lastname == '' ?  resultSelect[0].lastname : req.body.lastname ;
                let birthday = req.body.birthday == '' ?  resultSelect[0].birthday : req.body.birthday;
                let address = req.body.address == '' ?  resultSelect[0].address : req.body.address;
                let phoneNumber = req.body.phoneNumber == '' ? resultSelect[0].phoneNumber : req.body.phoneNumber;
                let driverLicence = req.body.driverLicence == '' ? resultSelect[0].driverLicence : req.body.driverLicence;
                
                req.sql.query('UPDATE users SET firstname = ?, lastname = ?, birthday = ?, address = ?, phoneNumber = ?,'+
                'driverLicence = ? WHERE username = ?', [firstname, lastname, birthday, address, phoneNumber, driverLicence, decodeToken.username])
                .then((resultUpdate) => {
                    res.json(success(resultUpdate))
                })
                .catch((err) => res.json(error(err.message)))
            })
            .catch((err) => res.json(error(err.message)))
        }else{
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function deleteAccount() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);
        if(decodeToken.role == 'ROLE_ADMIN'){
            req.sql.query('SELECT username FROM users WHERE idusers = ?', req.params.id)
            .then((resultSelect) => {
                if(resultSelect.length < 1){
                    res.json(error(new Error("Unknown id").message))
                }
                else{
                    if(decodeToken.username == resultSelect[0].username){
                        res.json(error(new Error('You cant delete your account').message))
                    }else{
                        req.sql.query('DELETE FROM users WHERE idusers = ?', req.params.id)
                        .then((resultDelete) => {
                            res.json(success(resultDelete));
                        })
                        .catch((err) => res.json(error(err.message)))
                    }
                }
            })
            .catch((err) => res.json(error(err.message)))
        }else{
            res.json(error(new Error('You are not admin').message))
        }
        
    }
}

export function userById() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);
        if(decodeToken.role == 'ROLE_ADMIN'){
            req.sql.query('SELECT * FROM users WHERE idusers = ?', req.params.id)
            .then((resultSelect) => {
                if(resultSelect.length < 1){
                    res.json(error(new Error('Unknown ID').message));
                }else{
                    res.json(success(resultSelect));
                }
            })
            .catch((err) => res.json(error(err.message)))
        }else{
            res.json(error(new Error('You cant to use this method you are not admin').message))
        }
    }
}


export function allUsers() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);
        if(decodeToken.role == 'ROLE_ADMIN'){
            req.sql.query('SELECT * FROM users')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err)))
        }else{
            res.json(error(new Error('You cant use this method, you are not admin')));
        }
       
    }
}

export function updateInformationAccountForAdmin() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);
        if(decodeToken.role == "ROLE_ADMIN"){
            req.sql.query('SELECT firstname, lastname, birthday, address, phoneNumber, driverLicence FROM users WHERE idusers = ?', [req.params.id])
            .then((resultSelect) => {
                if(resultSelect.length < 1){
                    res.json(error(new Error('ID Unknown').message))
                }else{
                    let firstname = req.body.firstname == '' || req.body.firstname == undefined ?  resultSelect[0].firstname : req.body.firstname ;
                let lastname = req.body.lastname == '' || req.body.lastname == undefined ?  resultSelect[0].lastname : req.body.lastname ;
                let birthday = req.body.birthday == '' || req.body.birthday == undefined ?  resultSelect[0].birthday : req.body.birthday;
                let address = req.body.address == '' || req.body.address == undefined ?  resultSelect[0].address : req.body.address;
                let phoneNumber = req.body.phoneNumber == '' || req.body.phoneNumber == undefined ? resultSelect[0].phoneNumber : req.body.phoneNumber;
                let driverLicence = req.body.driverLicence == '' || req.body.driverLicence == undefined  ? resultSelect[0].driverLicence : req.body.driverLicence;
                console.log(lastname)
                req.sql.query('UPDATE users SET firstname = ?, lastname = ?, birthday = ?, address = ?, phoneNumber = ?,'+
                'driverLicence = ? WHERE idusers = ?', [firstname, lastname, birthday, address, phoneNumber, driverLicence, req.params.id])
                .then((resultUpdate) => {
                    res.json(success(resultUpdate))
                })
                .catch((err) => res.json(error(err.message)))
                }
            })
            .catch((err) => console.log(err))
        }else{
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}


