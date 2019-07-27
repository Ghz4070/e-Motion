import {
    allLocations,
    getOneLocation,
    addLocation
} from '../Controller/Locations';

import {checkToken} from '../middleware';
import express from 'express';

export const adminRouteLocations = express.Router();
export const anonymeRouteLocations = express.Router();


const db = (req, res, next) => {
    req.sql = req.conn;
    next();
};

anonymeRouteLocations.route('/add')
    .post(db, addLocation());

/* adminRouteLocations.route('/add')
    .post(db, checkToken, addLocation()); */
    
adminRouteLocations.route('/all')
    .get(db, checkToken, allLocations());
adminRouteLocations.route('/:id')
    .get(db, checkToken, getOneLocation());

