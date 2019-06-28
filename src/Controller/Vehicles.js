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
            " ,licensePlate = ?, nbKm = ? , datePurchase = ?, price = ?" +
            " ,available = ?, lising = ?, offers_idoffers = ? WHERE idvehicle = ?",
            [req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate,
                req.body.nbKm, req.body.datePurchase, req.body.price, req.body.available,
                req.body.lising, req.body.offers_idoffers, req.params.id])
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json(err.message));
    }
}

export function addVehicles(conn) { //
    return (req, res) => {
        let brand = req.body.brand;
        let model = req.body.model;
        let serialNumber = req.body.serialNumber;
        let color = req.body.color;
        let licensePlate = req.body.licensePlate;
        let nbKm = req.body.nbKm;
        let datePurchase = req.body.datePurchase;
        let price = req.body.price;
        let available = req.body.available;
        let listing = req.body.lising;
        let offers_idoffers = req.body.offers_idoffers;

        conn.query("INSERT INTO vehicle (brand, model, serialNumber, color, licensePlate, nbKm, " +
            " datePurchase, price, available,lising) VALUES (? , ?, ?, ?, ? ,? ,? ,? ,? ,?) "
            , [brand, model, serialNumber, color, licensePlate, nbKm, datePurchase, price, available, listing, offers_idoffers])
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json(err.message));
    }
}

export function outVehiclesOfList(conn) { //Mettre un soft Delete et sauvergarder les modifications (historique) des actions effectuer
    return (req, res) => {
        conn.query("DELETE FROM `vehicle` WHERE idvehicle = ?", req.params.id)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json(err.message));
    }
}
