export function allLocations(conn) {
    return (req, res) => {
        conn.query(' SELECT * FROM offers ' +
            ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ')
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message));
    }
}

export function getOneLocation(conn) {
    return (req, res) => {
        conn.query(' SELECT * FROM offers ' +
            ' LEFT JOIN location ON offers.location_idlocation = location.idlocation ' +
            ' WHERE offers.idoffers = ?', req.params.id)
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message));
    }
}