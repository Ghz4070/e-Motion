import {
    allLocations,
    getOneLocation,
    addLocation,
    setStatus,
    updateLocation
} from '../Controller/Locations';

import {checkToken} from '../middleware';
import express from 'express';

export const adminRouteLocations = express.Router();

const db = (req, res, next) => {
    req.sql = req.conn;
    next();
};


adminRouteLocations.route('/add')
    .post(db, checkToken, addLocation());
adminRouteLocations.route('/all')
    .get(db, checkToken, allLocations());
adminRouteLocations.route('/:id')
    .get(db, checkToken, getOneLocation())
    .patch(db, checkToken, updateLocation());
adminRouteLocations.route('/cancel')
    .patch(db, checkToken, setStatus())
    