import {
    getOfferById,
    getAllOffers,
    postOffer,
    removeOffer,
    updateOffer
} from '../Controller/Offers';
import express from 'express';
import { checkToken } from './../middleware';


const db = (req,res,next) => {
    req.sql = req.conn;
    next();
}
    
export const anonymeRouteOffers = express.Router();
export const adminRouteOffers = express.Router();

anonymeRouteOffers.route('/')
    .get(db,getAllOffers())
anonymeRouteOffers.route('/:id')
    .get(db,getOfferById());
adminRouteOffers.route('/')
    .post(db,checkToken,postOffer());
adminRouteOffers.route('/:id')
    .delete(db,checkToken,removeOffer())
    .patch(db,checkToken,updateOffer());