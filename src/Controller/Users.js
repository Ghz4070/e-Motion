import { success, error } from '../returnjson';

export function addUser(conn){
    return (req, res) => {
        conn.query('SELECT * FROM users WHERE username = ? UNION SELECT * FROM users WHERE email = ?', [req.body.username, req.body.email])
        .then((resultSelectUsername) => {
            if(resultSelectUsername.length > 0){
              res.json(error('This username is used'))
            }else{
                conn.query('INSERT INTO users (firstname, lastname, birthday, address, phoneNumber, driverLicence, roles,'+ 
                            'password, email, pointFidelity, username) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                            [req.body.firstname, req.body.lastname, req.body.birthday,req.body.address, req.body.phoneNumber, req.body.driverLicence, 
                            '[ROLE_USER]',req.body.password, req.body.email, req.body.pointFidelity, req.body.username])
                .then((resultInsert)=> {
                    res.json(success(resultInsert))
                })
                .catch((errInsert) => res.json(error(errInsert.message)))
            }
        })
        .catch((errSelect) => res.json(error(errSelect.message)))
    }
}