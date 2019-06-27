export function getAllOffers(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers')
        .then((result) => {
            res.json(result);
            console.log(result)
        })
        .catch((err) => res.json(err.message))
    }
}

export function getOfferById(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers WHERE idoffers = ?', req.params.id)
        .then((result) => {
            res.json(result);
            console.log(result)
        })
        .catch((err) => res.json(err.message))
    }
}

export function postOffer(conn) {
    return (req, res) => {
        conn.query('INSERT INTO offers (title, price, description, penality, nbKm, pointFidelityOffers) VALUES (?,?,?,?,?,?)',
        [req.body.title,req.body.price,req.body.description,req.body.penality,req.body.nbKm,req.body.pointFidelityOffers])
        .then((result) => {
            res.json(result);
            console.log(result)
        })
        .catch((err) => res.json(err.message))
    }
}