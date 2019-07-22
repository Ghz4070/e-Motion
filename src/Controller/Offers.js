import {
    success,
    error
} from '../returnjson';

export function getAllOffers() {
    return (req, res) => {
        req.sql.query('SELECT * FROM offers')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function getOfferById() {
    return (req, res) => {
        req.sql.query('SELECT * FROM offers WHERE idoffers = ?', req.params.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function postOffer() {
    return (req, res) => {
        const decodeToken = jwt.decode(req.headers['x-access-token']);

        if (decodeToken.role.indexOf("ROLE_ADMIN") || decodeToken.role.indexOf("ROLE_POPRIO")) {
            res.json(error(new Error("Can't not use this method").message));
        } else {
            req.sql.query('INSERT INTO offers (title, price, description, penality, nbKm, pointFidelityOffers) VALUES (?,?,?,?,?,?)',
                [req.body.title, req.body.price, req.body.description, req.body.penality, req.body.nbKm, req.body.pointFidelityOffers])
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)))
        }
    }
}

export function removeOffer() {
    return (req, res) => {
        if (decodeToken.role.indexOf("ROLE_ADMIN") || decodeToken.role.indexOf("ROLE_POPRIO")) {
            res.json(error(new Error("Can't not use this method").message));
        } else {
            req.sql.query('DELETE FROM offers WHERE idoffers = ?', req.params.id)
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)))
        }
    }
}

export function updateOffer() {
    return (req, res) => {
        if (decodeToken.role.indexOf("ROLE_ADMIN") || decodeToken.role.indexOf("ROLE_POPRIO")) {
            res.json(error(new Error("Can't not use this method").message));
        } else {
            req.sql.query('SELECT * FROM offers WHERE idoffers= ?', req.params.id)
                .then((result2) => {
                    let title = result2[0].title;
                    let price = result2[0].price;
                    let description = result2[0].description;
                    let penality = result2[0].penality;
                    let nbKm = result2[0].nbKm;
                    let pointFidelityOffers = result2[0].pointFidelityOffers;

                    if (req.body.title !== undefined) {
                        title = req.body.title
                    }
                    if (req.body.price !== undefined) {
                        price = req.body.price
                    }
                    if (req.body.description !== undefined) {
                        description = req.body.description
                    }
                    if (req.body.penality !== undefined) {
                        penality = req.body.penality
                    }
                    if (req.body.nbKm !== undefined) {
                        nbKm = req.body.nbKm
                    }
                    if (req.body.pointFidelityOffers !== undefined) {
                        pointFidelityOffers = req.body.pointFidelityOffers
                    }
                    req.sql.query('UPDATE offers SET title=?, price=?, description=?, penality=?, nbKm=?, pointFidelityOffers=? WHERE idoffers = ?',
                        [title, price, description, penality, nbKm, pointFidelityOffers, req.params.id])
                        .then((result) => {
                            res.json(success(result));
                        })
                        .catch((err) => res.json(error(err.message)))
                })
        }
    }
}