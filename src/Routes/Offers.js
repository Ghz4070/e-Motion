import {
    getOfferById,
    getAllOffers,
    postOffer,
    removeOffer,
    updateOffer
} from '../Controller/Offers';
import {checkToken} from '../middleware';
import express from 'express';

module.exports = (_db) => {
    const db = _db;

    const anonymeRoute = express.Router();
    const adminRoute = express.Router();
    
    adminRoute.use(checkToken);
  
    anonymeRoute.route('/')
        .get(getAllOffers(db));
  
    anonymeRoute.route('/:id')
        .get(getOfferById(db));
  
    adminRoute.route('/')
        .post(postOffer(db));
  
    adminRoute.route('/:id')
        .delete(removeOffer(db));
        .patch(updateOffer(db));

    return [anonymeRoute,adminRoute]; 
}