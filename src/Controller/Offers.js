import {
    success,
    error
} from '../returnjson';
import jwt from "jsonwebtoken";

export function getAllOffers() {
    return (req, res) => {
        req.sql.query('SELECT * FROM offers')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function getAllOffersAvailable() {
    return (req, res) => {
        req.sql.query('SELECT * FROM offers WHERE hiddenOffers = 1')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function setHiddenOffers() {
    let idoff = '';
    return (req, res) => {
        req.sql.query('SELECT hiddenOffers FROM offers WHERE idoffers = ?', req.body.id)
            .then((id) => {
                idoff = id[0].hiddenOffers;
                if (idoff == 1) {
                    req.sql.query('UPDATE offers SET hiddenOffers = 0 WHERE idoffers = ?', req.body.id)
                        .then((result) => {
                            res.json(result);
                            console.log(result)
                        })
                        .catch((err) => res.json(err.message));
                }
                else {
                    req.sql.query('UPDATE offers SET hiddenOffers = 1 WHERE idoffers = ?', req.body.id)
                        .then((result) => {
                            res.json(result);
                            console.log(result)
                        })
                        .catch((err) => res.json(err.message));
                }
            })
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
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;
        const decodeTokenUsername = jwt.decode(req.headers['x-access-token']);


        req.sql.query('SELECT idusers FROM users WHERE username = ?', [decodeTokenUsername.username])
            .then((resultSelect) => {
                if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
                    req.sql.query('INSERT INTO offers (title, price, description, penality, nbKm, pointFidelityOffers, hiddenOffers, createdBy) VALUES (?,?,?,?,?,?,?,?)',
                        [req.body.title, req.body.price, req.body.description, req.body.penality, req.body.nbKm, req.body.pointFidelityOffers, req.body.hiddenOffers ,resultSelect[0].idusers])
                        .then((result) => {
                            res.json(success(result));
                        })
                        .catch((err) => res.json(error(err.message)))
                } else {
                    res.json(error(new Error("Can't not use this method").message));
                }
            })



        
    }
}

export function removeOffer() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query('DELETE FROM offers WHERE idoffers = ?', req.params.id)
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)))
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function updateOffer() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;
	
        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_PROPRIO') !== -1) {
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
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function getOfferByPropio() {
    return (req, res) => {
        const decodeTokenUser = jwt.decode(req.headers['x-access-token']);
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_PROPRIO') != -1 || decodeTokenRole.indexOf('ROLE_ADMIN') != -1) {
            req.sql.query('SELECT *, u.email FROM offers o inner join users u on u.idusers = o.createdBy WHERE u.username = ?', [decodeTokenUser.username])
                .then((result) => {
                    if (result.length > 0) {
                        res.json(success(result));
                    } else {
                        res.json(error('no offers'))
                    }
                })
                .catch((err) => res.json(error(err)))
        }
    }
}

export function getOfferByIdBody() {
    return (req, res) => {
        req.sql.query('SELECT * FROM offers WHERE idoffers = ?', req.body.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}
