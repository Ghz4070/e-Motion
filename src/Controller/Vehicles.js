export function allListVehicles(conn){ // getAllVehicles
    return (req, res) => {
        conn.query('SELECT * FROM vehicle')
            .then((result) => {
                res.json(result)
                console.log(result)
            })
            .catch((err) => res.json(err.message))
    }
}
