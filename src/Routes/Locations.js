import {
    allLocations,
    getOneLocation,
    addLocation,
    setStatus,
    updateLocation,
    removeLocation,
    finalPrice
} from '../Controller/Locations';

import {checkToken} from '../middleware';
import express from 'express';
import Stripe from 'stripe';

const stripe = Stripe('sk_test_lMNxFZljdsOJ1bhaedX7OWat00Em1PhI3O');
export const adminRouteLocations = express.Router();
export const anonymeRouteLocations = express.Router();

const db = (req, res, next) => {
    req.sql = req.conn;
    req.stripe = stripe;
    next();
};

adminRouteLocations.route('/updatePrice')
    .get(db,checkToken, finalPrice())
adminRouteLocations.route('/add')
    .post(db, checkToken, addLocation())
adminRouteLocations.route('/all')
    .get(db, checkToken, allLocations());
adminRouteLocations.route('/:id')
    .get(db, checkToken, getOneLocation())
    .patch(db, checkToken, updateLocation())
    .delete(db, checkToken, removeLocation());
anonymeRouteLocations.route('/cancel')
    .patch(db, checkToken, setStatus())
    