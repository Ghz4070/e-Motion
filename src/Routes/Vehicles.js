import {
    allListVehicles,
    allListVehiclesAvailable,
    getVehicleById,
    addVehicles,
    editVehicles,
    outVehiclesOfList,
    findVehicleByCriteria,
    bookACar,
    setAvailable,
    allVehiclesNotAvailable

} from '../Controller/Vehicles';
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
anonymeRouteVehicles.route('/findby')
    .get(db,findVehicleByCriteria());
anonymeRouteVehicles.route('/bookACar/:id')
    .put(db,bookACar());

adminRouteVehicles.route('/add')
    .post(checkToken,db,addVehicles());
adminRouteVehicles.route('/edit/:id')
    .patch(checkToken,db,editVehicles());
adminRouteVehicles.route('/delete/:id')
    .delete(checkToken,db,outVehiclesOfList());
adminRouteVehicles.route('/available/:id')
    .patch(checkToken,db,setAvailable());
adminRouteVehicles.route('/notavailable')
    .get(db,checkToken, allVehiclesNotAvailable())

