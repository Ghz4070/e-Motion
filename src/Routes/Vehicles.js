import {
    allListVehicles,
    allListVehiclesAvailable,
    getVehicleById,
    editVehicles,
    addVehicles,
    outVehiclesOfList
} from '../Controller/Vehicles';
import { checkToken } from '../middleware';
import express from 'express';

module.exports = (_db) => {
    const db = _db;

    const anonymeRoute = express.Router();
    const adminRoute = express.Router();
    
    adminRoute.use(checkToken);

    anonymeRoute.route('/all')
        .get(allListVehicles(db));
    anonymeRoute.route('/available')
        .get(allListVehiclesAvailable(db));
    anonymeRoute.route('/:id')
        .get(getVehicleById(db))
    adminRoute.route('/edit/:id')
        .patch(editVehicles(db));
    adminRoute.route('/add')
        .post(addVehicles(db));
    adminRoute.route('/delete/:id')
        .delete(outVehiclesOfList(db));
        
    return [anonymeRoute, adminRoute]
}