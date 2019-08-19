import {success, error} from '../returnjson';
import jwt from "jsonwebtoken";
import { reduc } from '../Method/methodUser';


export function finalPrice() {
    return (req, res) => {
            const finalPrice = reduc(req.query.pointFidelity,req.query.price)
            res.json(success(finalPrice))
    }
}

export function addLocation() {
    return (req, res) => {
        const decodeTokenUsername = jwt.decode(req.headers['x-access-token']);
        
        if(decodeTokenUsername){
            req.sql.query('SELECT pointFidelity, idusers, email FROM users WHERE username = ?', [decodeTokenUsername.username])
            .then((resultSelect) => {
                if(req.body.pointFidelityUsed <= resultSelect[0].pointFidelity){
                    const finalPrice = reduc(req.query.pointFidelity,req.query.price)
                    
                    
                    req.stripe.customers.create({
                        email: resultSelect[0].email
                    })
                    .then((customer) => {
                        //console.log(customer)
                        return req.stripe.customers.createSource(customer.id, {
                           source: 'tok_visa' 
                        });
                    })
                    .then((source) =>{
                        //console.log(source)
                        return req.stripe.charges.create({
                            amount: finalPrice * 100,
                            currency:'eur',
                            customer: source.customer
                        });
                    })
                    .catch((err) => console.log(err))
                    
                    req.sql.query(' INSERT INTO location (startDate, endDate, users_idusers, pointFidelityUsed, status, finalPrice, offers_idoffers, vehicle_idvehicle) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.startDate, req.body.endDate, resultSelect[0].idusers, req.body.pointFidelityUsed, req.body.status, finalPrice, req.body.offers_idoffers, req.body.vehicle_idvehicle]) 
                    .then((resultInsert) => {
                        req.sql.query('UPDATE users SET pointFidelity = ? WHERE username = ?', [resultSelect[0].pointFidelity - req.body.pointFidelityUsed, decodeTokenUsername.username])
                        .then((resultUpdate) => {
                            res.json(success('The method work'))
                        })
                        .catch((err) => res.json(error(err)))
                    })
                    .catch((err) => res.json(error(err.message)));
                }else{
                    res.json(error('You can\'t to use more than your point'))
                }
            })
            .catch((err) => res.json(error(err)))
        }else{
            res.json(error('You can\'t use this method'));
        }
    }
}


export function allLocations() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query(' SELECT l.idlocation, l.startDate, l.endDate, l.status, o.title, u.firstname, u.lastname, l.finalPrice, v.brand, v.model '
            +'FROM location l'
            +' INNER JOIN offers o ON l.offers_idoffers = o.idoffers'
            +' INNER JOIN users u ON l.users_idusers = u.idusers'
            +' INNER JOIN vehicle v ON l.vehicle_idvehicle = v.idvehicle')
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function getOneLocation() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query(' SELECT l.idlocation, l.startDate, l.endDate, l.status, l.finalPrice, u.firstname, u.lastname ' +
                ' FROM location l INNER JOIN users u ON l.vehicle_idvehicle = u.idusers ' +
                ' WHERE idlocation = ?', req.params.id)
                .then((result) => {
                    res.json(result);
                    console.log(result)
                })
                .catch((err) => res.json(err.message));
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}

export function setStatus() {
    return (req, res) => {
            req.sql.query('UPDATE location SET status = "Annuler" WHERE idlocation = ?', req.body.id)
                .then((result) => {
                    res.json(result);
                    console.log(result)
                })
                .catch((err) => res.json(err.message));
    }
}

export function updateLocation() {
    return (req, res) => {
            req.sql.query('UPDATE location SET startDate = ?, endDate = ?, status = ?, finalPrice = ? '+
             'WHERE idlocation = ?', [req.body.startDate,req.body.endDate,req.body.status,req.body.finalPrice,req.params.id])
                .then((result) => {
                    res.json(success(result));
                    console.log(result)
                })
                .catch((err) => res.json(err.message));
    }
}

export function removeLocation() {
    return (req, res) => {
        const decodeTokenRole = JSON.parse(jwt.decode(req.headers['x-access-token']).role).role;

        if (decodeTokenRole.indexOf('ROLE_ADMIN') !== -1 || decodeTokenRole.indexOf('ROLE_POPRIO') !== -1) {
            req.sql.query('DELETE FROM location WHERE idlocation = ?', req.params.id)
                .then((result) => {
                    res.json(success(result));
                })
                .catch((err) => res.json(error(err.message)))
        } else {
            res.json(error(new Error("Can't not use this method").message));
        }
    }
}