import {
    success,
    error
} from '../returnjson';

export function getAllOffers(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers')
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function getOfferById(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers WHERE idoffers = ?', req.params.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function postOffer(conn) {
    return (req, res) => {
        conn.query('INSERT INTO offers (title, price, description, penality, nbKm, pointFidelityOffers) VALUES (?,?,?,?,?,?)',
            [req.body.title, req.body.price, req.body.description, req.body.penality, req.body.nbKm, req.body.pointFidelityOffers])
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function removeOffer(conn) {
    return (req, res) => {
        conn.query('DELETE FROM offers WHERE idoffers = ?', req.params.id)
            .then((result) => {
                res.json(success(result));
            })
            .catch((err) => res.json(error(err.message)))
    }
}

export function updateOffer(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers WHERE idoffers= ?', req.params.id)
            .then((result2) => {
                let title = result2[0].title;
                let price = result2[0].price;
                let description = result2[0].description;
                let penality = result2[0].penality;
                let nbKm = result2[0].nbKm;
                let pointFidelityOffers = result2[0].pointFidelityOffers;

                if (req.body.title != undefined) {
                    title = req.body.title
                }
                if (req.body.price != undefined) {
                    price = req.body.price
                }
                if (req.body.description != undefined) {
                    description = req.body.description
                }
                if (req.body.penality != undefined) {
                    penality = req.body.penality
                }
                if (req.body.nbKm != undefined) {
                    nbKm = req.body.nbKm
                }
                if (req.body.pointFidelityOffers != undefined) {
                    pointFidelityOffers = req.body.pointFidelityOffers
                }
                conn.query('UPDATE offers SET title=?, price=?, description=?, penality=?, nbKm=?, pointFidelityOffers=? WHERE idoffers = ?',
                    [title, price, description, penality, nbKm, pointFidelityOffers, req.params.id])
                    .then((result) => {
                        res.json(success(result));
                    })
            })
            .catch((err) => res.json(error(err.message)))
    }
}