export function allLocations(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers' +
            'LEFT JOIN location ON offers.idoffers = location.location_idlocation')
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message));
    }
}