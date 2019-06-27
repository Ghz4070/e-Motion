export function allListVehicles(conn) { // getAllVehicles
    return (req, res) => {
        conn.query('SELECT * FROM vehicle')
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message));
    }
}


export function allListVehiclesAvailable(conn) { // getAllVehiclesAvailable
    return (req, res) => {
        conn.query('SELECT * FROM vehicle WHERE available = 1') // available = 1, unavailable = 0
            .then((result) => {
                res.json(result);
                console.log(result)

            })
            .catch((err) => res.json(err.message));
    }
}

export function getVehicleById(conn) { // get vehicle by id
    return (req, res) => {
        conn.query('SELECT * FROM vehicle WHERE idvehicle = ?', req.params.id)
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message));
    }
}

export function editVehicles(conn) { //
    return (req, res) => {
        conn.query("UPDATE vehicle SET brand = ?, model = ?, serialNumber = ?,color = ?" +
            " licensePlate = ?, nbKm = ? , datePurchase = ?, price = ?" +
            " available = ?, lising = ?, offers_idoffers = ? WHERE idvehicle = ?",
            [req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate,
                req.body.nbKm, req.body.datePurchase, req.body.price, req.body.available,
                req.body.lising, req.body.offers_idoffers, req.param.id])
            .then((result) => {
                console.log(req.body)
                res.json(result)
            })
            .catch((err) => res.json(err.message));
    }
}
export function addVehicles(conn) { //
    return (req, res) => {
        conn.query("INSERT INTO vehicle (brand, model, serialNumber, color, licensePlate, nbKm, "+
        " datePurchase, price, available,lising) VALUES (? , ?, ?, ?, ? ,? ,? ,? ,? ,?) "
        ,[req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate,
                req.body.nbKm, req.body.datePurchase, req.body.price, req.body.available,
                req.body.lising, req.body.offers_idoffers])
            .then((result) => {
                console.log('antoine')
                res.json(result)
            })
            .catch((err) => res.json(err.message));
    }
}
