import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import {email, password} from './../smtp'
import {success, error} from '../returnjson';
import {secret} from '../config';


const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: password
    }
});

const handlebarsOption = {
    viewEngine: {
        extName: '.html',
        partialsDir: path.join(__dirname, '../Template'),
        layoutsDir: path.join(__dirname, '../Template'),
    },
    viewPath: path.join(__dirname, '../Template'),
    extName: '.html',

}

smtpTransport.use('compile', nodemailerExpressHandlebars(handlebarsOption))


export function addUser() {
    return (req, res) => {
        req.sql.query('SELECT * FROM users WHERE username = ? UNION SELECT * FROM users WHERE email = ?', [req.body.username, req.body.email])
            .then((resultSelectUsername) => {
                if (resultSelectUsername.length > 0) {
                    console.log(resultSelectUsername)
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
                                        let role = {
                                            role: [
                                                'ROLE_USER',
                                            ]
                                        };
                                        req.sql.query("INSERT INTO users (firstname, lastname, birthday, address, phoneNumber, driverLicence, roles," +
                                            'password, email, username,tokenValidateAccount) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                                            [req.body.firstname, req.body.lastname, req.body.birthday, req.body.address, req.body.phoneNumber, req.body.driverLicence,
                                                role, hash, req.body.email, req.body.username, hash])
                                            .then((resultInsert) => {
                                                const data = {
                                                    to: req.body.email,
                                                    from: email,
                                                    template: 'Activate_account',
                                                    subject: 'Activer votre compte',
                                                    context: {
                                                        name: req.body.firstname,
                                                        url: 'http://localhost:3000/api/v1/user/activate_account?token=' + hash,
                                                    }
                                                }
                                                smtpTransport.sendMail(data, (err) => {
                                                    if (err) {
                                                        res.json(error(err.message))
                                                    }
                                                    res.json(success(resultInsert));
                                                    console.log(('Mail envoyé'))

                                                })
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
        req.sql.query('SELECT username, password, tokenValidateAccount ,roles FROM users WHERE username = ?', req.body.username)
            .then((result) => {
                if (result.length < 1) {
                    res.json(error('Unknown username'));
                } else {
                    if (result[0].tokenValidateAccount != null) {
                        res.json(error('This account isnt activated, please active your account'))
                    } else {
                        bcrypt.compare(req.body.password, result[0].password)
                            .then((passwordDecrypted) => {
                                if (passwordDecrypted && req.body.username == result[0].username) {
                                    let token = jwt.sign({username: req.body.username, role: result[0].roles}, secret, {
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
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;
        const decodeTokenUsername = jwt.decode(req.headers['x-access-token']);

        if (decodeTokenRole.indexOf('ROLE_USER') != -1 || decodeTokenRole.indexOf('ROLE_POPRIO') != -1) {
            req.sql.query('SELECT firstname, lastname, birthday, address, phoneNumber, driverLicence FROM users WHERE username = ?', [decodeTokenUsername.username])
                .then((resultSelect) => {
                    console.log(resultSelect)
                    let firstname = req.body.firstname == '' ? resultSelect[0].firstname : req.body.firstname;
                    let lastname = req.body.lastname == '' ? resultSelect[0].lastname : req.body.lastname;
                    let birthday = req.body.birthday == '' ? resultSelect[0].birthday : req.body.birthday;
                    let address = req.body.address == '' ? resultSelect[0].address : req.body.address;
                    let phoneNumber = req.body.phoneNumber == '' ? resultSelect[0].phoneNumber : req.body.phoneNumber;
                    let driverLicence = req.body.driverLicence == '' ? resultSelect[0].driverLicence : req.body.driverLicence;

                    req.sql.query('UPDATE users SET firstname = ?, lastname = ?, birthday = ?, address = ?, phoneNumber = ?,' +
                        'driverLicence = ? WHERE username = ?', [firstname, lastname, birthday, address, phoneNumber, driverLicence, decodeTokenUsername.username])
                        .then((resultUpdate) => {
                            res.json(success(resultUpdate))
                        })
                        .catch((err) => res.json(error(err.message)))
                })
                .catch((err) => res.json(error(err.message)))
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function deleteAccount() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;
        const decodeTokenUsername = jwt.decode(req.headers['x-access-token']);

        if (decodeTokenRole.indexOf('ROLE_ADMIN') != -1) {
            req.sql.query('SELECT username FROM users WHERE idusers = ?', req.params.id)
                .then((resultSelect) => {
                    if (resultSelect.length < 1) {
                        res.json(error(new Error("Unknown id").message))
                    } else {
                        if (decodeTokenUsername.username == resultSelect[0].username) {
                            res.json(error(new Error('You cant delete your account').message))
                        } else {
                            req.sql.query('DELETE FROM users WHERE idusers = ?', req.params.id)
                                .then((resultDelete) => {
                                    res.json(success(resultDelete));
                                })
                                .catch((err) => res.json(error(err.message)))
                        }
                    }
                })
                .catch((err) => res.json(error(err.message)))
        } else {
            res.json(error(new Error('You are not admin').message))
        }

    }
}

export function userById() {
    return (req, res) => {
        const decodeToken = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeToken.indexOf('ROLE_ADMIN') != -1) {
            req.sql.query('SELECT * FROM users WHERE idusers = ?', req.params.id)
                .then((resultSelect) => {
                    if (resultSelect.length < 1) {
                        res.json(error(new Error('Unknown ID').message));
                    } else {
                        res.json(success(resultSelect));
                    }
                })
                .catch((err) => res.json(error(err.message)))
        } else {
            res.json(error(new Error('You cant to use this method you are not admin').message))
        }
    }
}


export function allUsers() {
    return (req, res) => {
        const decodeToken = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;
        if (decodeToken.indexOf('ROLE_ADMIN') != -1) {
            req.sql.query('SELECT * FROM users')
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err)))
        } else {
            res.json(error(new Error('You cant use this method, you are not admin')));
        }

    }
}

export function updateInformationAccountForAdmin() {
    return (req, res) => {
        const decodeToken = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeToken.indexOf('ROLE_ADMIN') != -1) {
            req.sql.query('SELECT firstname, lastname, birthday, address, phoneNumber, driverLicence FROM users WHERE idusers = ?', [req.params.id])
                .then((resultSelect) => {
                    if (resultSelect.length < 1) {
                        res.json(error(new Error('ID Unknown').message))
                    } else {
                        let firstname = req.body.firstname == '' || req.body.firstname == undefined ? resultSelect[0].firstname : req.body.firstname;
                        let lastname = req.body.lastname == '' || req.body.lastname == undefined ? resultSelect[0].lastname : req.body.lastname;
                        let birthday = req.body.birthday == '' || req.body.birthday == undefined ? resultSelect[0].birthday : req.body.birthday;
                        let address = req.body.address == '' || req.body.address == undefined ? resultSelect[0].address : req.body.address;
                        let phoneNumber = req.body.phoneNumber == '' || req.body.phoneNumber == undefined ? resultSelect[0].phoneNumber : req.body.phoneNumber;
                        let driverLicence = req.body.driverLicence == '' || req.body.driverLicence == undefined ? resultSelect[0].driverLicence : req.body.driverLicence;
                        console.log(lastname)
                        req.sql.query('UPDATE users SET firstname = ?, lastname = ?, birthday = ?, address = ?, phoneNumber = ?,' +
                            'driverLicence = ? WHERE idusers = ?', [firstname, lastname, birthday, address, phoneNumber, driverLicence, req.params.id])
                            .then((resultUpdate) => {
                                res.json(success(resultUpdate))
                            })
                            .catch((err) => res.json(error(err.message)))
                    }
                })
                .catch((err) => console.log(err))
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function forgotPassword() {
    return (req, res) => {
        console.log(req.query.email)
        req.sql.query('SELECT * FROM users WHERE email = ?', req.query.email)
            .then((resultSelect) => {
                if (resultSelect.length > 0) {
                    if (resultSelect[0].tokenResetPassword != null) {
                        req.sql.query('UPDATE users SET tokenResetPassword = ? WHERE idusers = ?', [null, resultSelect[0].idusers])
                            .then((resultUpdate) => {
                                console.log('delete')
                            })
                            .catch((err) => res.json(error(err)))
                    }
                    crypto.randomBytes(20, (err, buffer) => {
                        if (err) {
                            res.json(error(err))
                        }
                        const token = buffer.toString('hex')
                        req.sql.query("UPDATE users SET tokenResetPassword = ?  WHERE idusers = ?", [token, resultSelect[0].idusers])
                            .then((resultInsert) => {
                                const data = {
                                    to: resultSelect[0].email,
                                    from: email,
                                    template: 'forgot-password-email',
                                    subject: 'Réinistialisation du mot de passe',
                                    context: {

                                        url: 'http://localhost:3000/api/v1/user/reset_password?token=' + token,
                                        name: resultSelect[0].firstname
                                    }
                                }

                                smtpTransport.sendMail(data, (err) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    }
                                    res.json(success('Mail envoyé'))
                                })
                            })
                            .catch((err) => res.json(error(err.message)))
                    })

                } else {
                    res.json(error('Mail inconnu'))
                }
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function resetPassword() {
    return (req, res) => {
        if (req.body.firstPassword == req.body.secondPassword) {
            req.sql.query('SELECT email, firstname FROM users WHERE tokenResetPassword = ?', [req.query.token])
                .then((resultSelect) => {
                    bcrypt.genSalt(10)
                        .then((salt) => {
                            bcrypt.hash(req.body.firstPassword, salt)
                                .then((hash) => {
                                    req.sql.query('UPDATE users SET password = ? , tokenResetPassword = ? WHERE tokenResetPassword = ?', [hash, null, req.query.token])
                                        .then((resultUpdate) => {
                                            const data = {
                                                to: resultSelect[0].email,
                                                from: email,
                                                template: 'reset-password-email',
                                                subject: 'Mot de passe réinitialisé !',
                                                context: {
                                                    name: resultSelect[0].firstname
                                                }
                                            }
                                            smtpTransport.sendMail(data, (err) => {
                                                if (err) {
                                                    res.json(error(err.message))
                                                }
                                                res.json(success('Mail envoyé'))
                                            })
                                        })
                                        .catch((err) => (res.json(error(err))))
                                })
                                .catch((err) => res.json(error(err)))
                        })
                        .catch((err) => res.json(error(err)))
                })
                .catch((err) => res.json(error(err)))
        } else {
            res.json(error('Not the same password'))
        }
    }
}

export function activateAccount() {
    return (req, res) => {
        req.sql.query('SELECT email, firstname FROM users WHERE tokenValidateAccount = ?', [req.query.token])
            .then((resultSelect) => {
                req.sql.query('UPDATE users SET tokenValidateAccount = ? WHERE tokenValidateAccount = ?', [null, req.query.token])
                    .then((resultUpdate) => {
                        const data = {
                            to: resultSelect[0].email,
                            from: email,
                            template: 'Activited_account',
                            subject: 'Votre compte est activé',
                            context: {
                                name: resultSelect[0].firstname,
                            }
                        }
                        smtpTransport.sendMail(data, (err) => {
                            if (err) {
                                res.json(error(err.message))
                            }
                            res.json(success('Mail envoyé'));
                        })
                    })
                    .catch((err) => res.json(error(err)))
            })
            .catch((err) => res.json(error(err)))
    }
}

export function addPropioUserByAdmin() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1) {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let phoneNumber = req.body.phoneNumber;
            let email = req.body.email;
            let username = req.body.username;
            let password = req.body.phoneNumber;
            let roles = 'ROLES_PROPRIO';

            req.sql.query("INSERT INTO users () VALUES (? , ?, ?, ?, ?) "
                , [brand, model, serialNumber, color])
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}