export function allListVehicles(conn){ // getAllVehicles
    return (req, res) => {
        conn.query('SELECT * FROM vehicle')
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message))
    }
}

export function allListVehiclesAvailable(conn){ // getAllVehiclesAvailable
    return (req, res) => {
        conn.query('SELECT * FROM vehicle WHERE available = 1') // available = 1, unavailable = 0
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message))
    }
}

export function getVehicleById(conn){ // get vehicle by id
    return (req, res) => {
        conn.query('SELECT * FROM vehicle WHERE idvehicle = ?', req.params.id)
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message))
    }
}