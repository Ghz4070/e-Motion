import {success, error} from '../returnjson';
import jwt from 'jsonwebtoken';

export function allListVehicles() { // getAllVehicles
    return (req, res) => {
        req.sql.query('SELECT * FROM vehicle')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)));
    }
}

export function allVehiclesNotAvailable() {
    return (req, res) => {
            req.sql.query('SELECT * FROM vehicle WHERE available = FALSE')
            .then((resultSelect) => {
                if(resultSelect.length > 0){
                    res.json(success(resultSelect))
                }else{
                    res.json(error('All available'))
                }
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function allListVehiclesAvailable() { // getAllVehiclesAvailable
    return (req, res) => {
        req.sql.query('SELECT * FROM vehicle WHERE available = 1') // available = 1, unavailable = 0
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)));
    }
}

export function getVehicleById() { // get vehicle by id
    return (req, res) => {
        req.sql.query('SELECT * FROM vehicle v INNER JOIN offers o on v.offers_idoffers = o.idoffers WHERE idvehicle = ?', req.params.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)));
    }
}

export function getVehicleByOffer() { // get vehicle by offer
    return (req, res) => {
        req.sql.query('SELECT * FROM vehicle WHERE offers_idoffers = ?', req.params.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)));
    }
}

export function editVehicles() { //
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;
      
        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_PROPRIO') !== -1) {
            let img = req.files['imgVehicle'] ? req.files['imgVehicle'][0] : null;

            if(img){
                if(img.size <= 3000000 && img.mimetype == "image/jpeg" || img.mimetype == "image/png"){
                    const sqlQueryImg = 'UPDATE vehicle SET brand = ?, model = ?, serialNumber = ?,color = ?,licensePlate = ?, nbKm = ? , datePurchase = ?, price = ?, imgVehicle = ?'+ 
                    ',available = ?, offers_idoffers = ?, typeVehicle = ? WHERE idvehicle = ?';
        
                    const sqlQueryTabImg = [req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate,
                        req.body.nbKm, req.body.datePurchase, req.body.price, img.originalname ,req.body.available,
                        req.body.offers_idoffers, req.body.typeVehicle ,req.params.id];

                    req.sql.query(sqlQueryImg,sqlQueryTabImg)
                        .then((result) => {
                            res.json(success(result))
                        })
                        .catch((err) => res.json(error(err.message)));
                    }
            }else{
                const sqlQueryWithoutImg = 'UPDATE vehicle SET brand = ?, model = ?, serialNumber = ?,color = ?,licensePlate = ?, nbKm = ? , datePurchase = ?, price = ?'+ 
                ',available = ?, offers_idoffers = ?, typeVehicle = ? WHERE idvehicle = ?';
 
                const sqlQueryTabWithoutImg = [req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate,
                    req.body.nbKm, req.body.datePurchase, req.body.price, req.body.available, req.body.offers_idoffers, req.body.typeVehicle ,req.params.id];

                req.sql.query(sqlQueryWithoutImg,sqlQueryTabWithoutImg)
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
            }
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function addVehicles() { //
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            
            let img = req.files['imgVehicle'] ? req.files['imgVehicle'][0] : 'default.jpg';
        
            if(img){
                if(img === 'default.jpg' || img.size <= 3000000 && img.mimetype == "image/jpeg" || img.mimetype == "image/png"){
                    img = img != 'default.jpg' ?  req.files['imgVehicle'][0].originalname : 'default.jpg';
                    req.sql.query("INSERT INTO vehicle (brand, model, serialNumber, color, licensePlate, nbKm, " +
                        "datePurchase, price, available, imgVehicle, typeVehicle, offers_idoffers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) "
                        , [req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate, req.body.nbKm, 
                            req.body.datePurchase, req.body.price, req.body.available, img, req.body.typeVehicle, req.body.offers_idoffers])
                        .then((result) => {
                            res.json(success(result))
                        })
                        .catch((err) => res.json(error(err.message)));
                }else{
                    res.json(error(new Error('Error size or format').message))
                }
            } else{
                res.json(error(new Error('no img').message))
            }
        }else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function outVehiclesOfList() { //Mettre un soft Delete et sauvergarder les modifications (historique) des actions effectuer
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query("DELETE FROM vehicle WHERE idvehicle = ?", req.params.id)
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function findVehicleByCriteria() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        // Dans un second temps une revue de code sera nécessaire ICI

        let brand = req.body.brand != undefined ? req.body.brand : null;
        let model = req.body.model != undefined ? req.body.model : null;
        let serialNumber = req.body.serialNumber != undefined ? req.body.serialNumber : null;
        let color = req.body.color != undefined ? req.body.color : null;
        let licensePlate = req.body.licensePlate != undefined ? req.body.licensePlate : null; //modifier licence
        let nbKm = req.body.nbKm != undefined ? req.body.nbKm : null;
        let datePurchase = req.body.datePurchase != undefined ? req.body.datePurchase : null;
        let price = req.body.price != undefined ? req.body.price : null;
        let available = req.body.available != undefined ? req.body.available : null;
        let listing = req.body.lising != undefined ? req.body.lising : null;
        let offers_idoffers = req.body.offers_idoffers != undefined ? req.body.offers_idoffers : null;

        let arrayData = {
            "brand": brand, "model": model, "serialNumber": serialNumber, "color": color, "licensePlate": licensePlate,
            "nbKm": nbKm, "datePurchase": datePurchase, "price": price, "available": available, "listing": listing,
            "offers_idoffers": offers_idoffers
        }


        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            let query = "SELECT * FROM vehicle ";
            let first = true;
            for (var key in arrayData) {
                if (arrayData[key] != null && first == true) {
                    query += " WHERE " + key + " = " + arrayData[key];
                    first = false;
                } else if (arrayData[key] != null) {
                    query += " AND " + key + " = " + arrayData[key];
                }
            }

            req.sql.query(query)
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => res.json(err.message));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }

    }
}

export function bookACar() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        let idVehicule = req.params.id;
        // Voir si une sécurite ici est réélemment pertinente // lire defensive programming 
        
        req.sql.query("UPDATE vehicle SET available = 0 WHERE idvehicle = ?", req.params.id)
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));

    }
}

export function setAvailable() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1) {
            req.sql.query("UPDATE vehicle SET available = ? WHERE idvehicle = ?",
                [req.body.available, req.params.id])
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function vehicleByOffers(){
    return (req, res) => {
        const decodeTokenUser = jwt.decode(req.headers['x-access-token']);
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if(decodeTokenRole.indexOf('ROLE_PROPRIO') != -1 || decodeTokenRole.indexOf('ROLE_ADMIN') != -1){
            req.sql.query('SELECT *, u.email, o.title FROM vehicle v INNER JOIN users u on u.idusers = v.createdBy'+
            '  inner join offers o on v.offers_idoffers = o.idoffers WHERE u.username = ?  ORDER BY idvehicle', [decodeTokenUser.username])
            .then((result) => {
                if(result.length > 0){
                    res.json(success(result))
                }else{
                    res.json(error('no vehicle'))
                }
            })
            .catch((err) => res.json(error(err)))
        }
    }  
}
