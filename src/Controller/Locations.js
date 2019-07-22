import {success, error} from '../returnjson';
import jwt from "jsonwebtoken";

export function allLocations() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);

        if (decodeToken.role.indexOf("ROLE_ADMIN" || "ROLE_POPRIO")) {
            res.json(error(new Error("Can't not use this method").message));
        } else {
            req.sql.query(' SELECT * FROM offers ' +
                ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ')
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)));
        }
    }
}

export function getOneLocation() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);

        if (decodeToken.role.indexOf("ROLE_ADMIN" || "ROLE_POPRIO")) {
            res.json(error(new Error("Can't not use this method").message));
        } else {
            req.sql.query(' SELECT * FROM offers ' +
                ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ' +
                ' WHERE offers.idoffers = ?', req.params.id)
                .then((result) => {
                    res.json(result);
                    console.log(result)
                })
                .catch((err) => res.json(err.message));
        }
    }
}