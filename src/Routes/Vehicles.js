import {
    allListVehicles,
    allListVehiclesAvailable,
    getVehicleById,
    addVehicles,
    editVehicles,
    outVehiclesOfList
} from '../Controller/Vehicles';
<<<<<<< HEAD
=======
import {checkToken} from '../middleware';
>>>>>>> 4fe9b396121f03027042dd66db5388a28ecc123d
import express from 'express';
import {checkToken} from './../middleware'


export const adminRouteVehicles = express.Router();
export const anonymeRouteVehicles = express.Router();

let db = (req, res, next) => {
    req.sql= req.conn
    next()
}

anonymeRouteVehicles.route('/all')
    .get(db,allListVehicles())
anonymeRouteVehicles.route('/available')
    .get(db,allListVehiclesAvailable());
anonymeRouteVehicles.route('/:id')
    .get(db,getVehicleById())
adminRouteVehicles.route('/add')
    .post(checkToken,db,addVehicles());
adminRouteVehicles.route('/edit/:id')
    .patch(checkToken,db,editVehicles());
adminRouteVehicles.route('/delete/:id')
    .delete(checkToken,db,outVehiclesOfList());

