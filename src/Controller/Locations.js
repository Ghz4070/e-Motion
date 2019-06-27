export function allLocations(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM location')
            .then((result) => {
                res.json(result);
                console.log(result)
            })
            .catch((err) => res.json(err.message));
    }
}