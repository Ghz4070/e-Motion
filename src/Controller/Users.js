import { success, error } from '../returnjson';
import bcrypt from 'bcryptjs';

export function addUser(conn){
    return (req, res) => {
        conn.query('SELECT * FROM users WHERE username = ? UNION SELECT * FROM users WHERE email = ?', [req.body.username, req.body.email])
        .then((resultSelectUsername) => {
            if(resultSelectUsername.length > 0){
              res.json(error('This username is used'));
            }else{
                let nullField = false;
                
                for(let key of Object.entries(req.body)){                    
                    if(key[1] == "" && key[0] != 'pointFidelity' || key[1] == null && key[0] != 'pointFidelity'){
                        nullField = true;
                   }
                }

                if(nullField){
                    res.json(error(new Error('One file empty').message))
                }else{
                    bcrypt.genSalt(10)
                    .then((salt) => {
                        bcrypt.hash(req.body.password, salt)
                        .then((hash) => {
                            conn.query('INSERT INTO users (firstname, lastname, birthday, address, phoneNumber, driverLicence, roles,'+ 
                            'password, email, username) VALUES (?,?,?,?,?,?,?,?,?,?)',
                            [req.body.firstname, req.body.lastname, req.body.birthday,req.body.address, req.body.phoneNumber, req.body.driverLicence, 
                            '[ROLE_USER]', hash, req.body.email, req.body.username])
                            .then((resultInsert)=> {
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