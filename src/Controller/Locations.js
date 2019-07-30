import {success, error} from '../returnjson';
import jwt from "jsonwebtoken";
import { reduc } from '../Method/methodUser';

export function addLocation() {
    return (req, res) => {
        const decodeTokenUsername = jwt.decode(req.headers['x-access-token']);
        
        if(decodeTokenUsername){
            req.sql.query('SELECT pointFidelity, idusers FROM users WHERE username = ?', [decodeTokenUsername.username])
            .then((resultSelect) => {
                if(req.body.pointFidelityUsed <= resultSelect[0].pointFidelity){
                    const finalPrice = reduc(req.query.pointFidelity,req.query.price)


                    req.sql.query(' INSERT INTO location (startDate, endDate, users_idusers, pointFidelityUsed, status, finalPrice ,offers_idoffers,  vehicle_idvehicle) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.startDate, req.body.endDate, resultSelect[0].idusers, req.body.pointFidelityUsed, req.body.status, finalPrice ,req.body.idoffers, req.body.idvehicle]) 
                    .then((resultInsert) => {
                        req.sql.query('UPDATE users SET pointFidelity = ? WHERE username = ?', [resultSelect[0].pointFidelity - req.body.pointFidelityUsed, decodeTokenUsername.username])
                        .then((resultUpdate) => {
                            res.json(success('The method work'))
                        })
                        .catch((err) => res.json(error(err)))
                    })
                    .catch((err) => res.json(error(err.message)));
                }else{
                    res.json(error('You can\'t to use more than your point'))
                }
            })
            .catch((err) => res.json(error(err)))
        }else{
            res.json(error('You can\'t use this method'));
        }
    }
}


export function allLocations() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query(' SELECT * FROM location LEFT JOIN offers ON location.offers_idoffers = offers.idoffers')
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function getOneLocation() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query(' SELECT * FROM offers ' +
                ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ' +
                ' WHERE offers.idoffers = ?', req.params.id)
                .then((result) => {
                    res.json(result);
                    console.log(result)
                })
                .catch((err) => res.json(err.message));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function setStatus() {
    return (req, res) => {
            req.sql.query('UPDATE location SET status = "Annuler" WHERE idlocation = ?', req.body.id)
                .then((result) => {
                    res.json(result);
                    console.log(result)
                })
                .catch((err) => res.json(err.message));
    }
}
