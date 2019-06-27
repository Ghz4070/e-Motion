
export function addUser(conn){
    return (req, res) => {
        conn.query('SELECT * FROM users WHERE username = ?', [req.params.username])
        .then((result) => {
            console.log(result)
        })
        .catch((err) => res.json(err.message))
    }
}