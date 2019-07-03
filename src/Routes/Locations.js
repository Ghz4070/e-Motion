import {
    allLocations
} from '../Controller/Locations';
import { checkToken } from '../middleware';
import express from 'express';

export const adminRouteLocations = express.Router();

const db = (req, res, next) => {
    req.sql = req.conn;
    next();
}
   
adminRouteLocations.route('/all')
    .get(db,checkToken,allLocations())

