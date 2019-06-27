export function getAllOffers(conn) {
    return (req, res) => {
        conn.query('SELECT * FROM offers')
        .then((result) => {
            res.json(result)
            console.log(result)
        })
        .catch((err) => res.json(err.message))
    }
}