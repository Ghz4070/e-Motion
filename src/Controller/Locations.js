import {success, error} from '../returnjson';

export function allLocations() {
    return (req, res) => {
        req.sql.query(' SELECT * FROM offers ' +
            ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)));
    }
}

export function getOneLocation() {
    return (req, res) => {
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