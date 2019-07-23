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
        req.sql.query('SELECT * FROM vehicle WHERE idvehicle = ?', req.params.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)));
    }
}

export function editVehicles() { //
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query("UPDATE vehicle SET brand = ?, model = ?, serialNumber = ?,color = ?" +
                " ,licensePlate = ?, nbKm = ? , datePurchase = ?, price = ?" +
                " ,available = ?, lising = ?, offers_idoffers = ? WHERE idvehicle = ?",
                [req.body.brand, req.body.model, req.body.serialNumber, req.body.color, req.body.licensePlate,
                    req.body.nbKm, req.body.datePurchase, req.body.price, req.body.available,
                    req.body.lising, req.body.offers_idoffers, req.params.id])
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function addVehicles() { //
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
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

            req.sql.query("INSERT INTO vehicle (brand, model, serialNumber, color, licensePlate, nbKm, " +
                " datePurchase, price, available,lising) VALUES (? , ?, ?, ?, ? ,? ,? ,? ,? ,?) "
                , [brand, model, serialNumber, color, licensePlate, nbKm, datePurchase, price, available, listing, offers_idoffers])
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function outVehiclesOfList(conn) { //Mettre un soft Delete et sauvergarder les modifications (historique) des actions effectuer
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query("DELETE FROM `vehicle` WHERE idvehicle = ?", req.params.id)
                .then((result) => {
                    res.json(success(result))
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function findVehicleByCriteria(conn) {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        // Dans un second temps une revue de code sera nécessaire ICI

        let brand = req.body.brand != undefined ? req.body.brand : null;
        let model = req.body.model != undefined ? req.body.model : null;
        let serialNumber = req.body.serialNumber != undefined ? req.body.serialNumber : null;
        let color = req.body.color != undefined ? req.body.color : null;
        let licensePlate = req.body.licensePlate != undefined ? req.body.licensePlate : null  ; //modifier licence
        let nbKm = req.body.nbKm != undefined ? req.body.nbKm : null;
        let datePurchase = req.body.datePurchase != undefined ? req.body.datePurchase : null;
        let price = req.body.price != undefined ? req.body.price : null;
        let available = req.body.available != undefined ? req.body.available : null;
        let listing = req.body.lising != undefined ? req.body.lising : null;
        let offers_idoffers = req.body.offers_idoffers != undefined ? req.body.offers_idoffers : null;

        let arrayData = { "brand" : brand, "model" : model, "serialNumber" : serialNumber, "color" : color, "licensePlate" : licensePlate,
                        "nbKm": nbKm, "datePurchase" : datePurchase, "price" : price, "available": available, "listing" : listing,
                         "offers_idoffers" :offers_idoffers }


        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            let query = "SELECT * FROM vehicle ";
            let first = true ; 
            for(var key in arrayData){
                if(arrayData[key] != null && first == true) {
                    query += " WHERE " + key + " = " + arrayData[key] ;
                    first = false; 
                }
                else if ( arrayData[key] != null) {
                    query += " AND " + key + " = " + arrayData[key] ;
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
