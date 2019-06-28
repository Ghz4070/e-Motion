import {
    allLocations
} from '../Controller/Locations';
import { rootApi } from '../config';
import { checkToken } from '../middleware';
import express from 'express';

module.exports = (_db) => {
    const db = _db;

    const adminRoute = express.Router();
    
    adminRoute.use(checkToken);
    
    adminRoute.route('/all')
        .get(allLocations(db))

    return adminRoute;
}
