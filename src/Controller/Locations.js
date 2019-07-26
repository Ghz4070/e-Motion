import {success, error} from '../returnjson';
import jwt from "jsonwebtoken";

export function addLocation() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query(' INSERT INTO location (startDate, endDate, users_idusers, cancelLocation, pointFidelityUsed ) VALUES (?, ?, ?, ?, ?)',
            [req.body.startDate, req.body.endDate, req.body.users_idusers, req.body.cancelLocation, req.body.pointFidelityUsed]) 
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}


export function allLocations() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query(' SELECT * FROM offers ' +
                ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ')
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
