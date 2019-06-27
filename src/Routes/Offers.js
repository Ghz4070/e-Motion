import {getOfferById, getAllOffers, postOffer } from '../Controller/Offers';
import { rootApi } from '../config';

export function routesOffers(app, conn) {
    app.route(rootApi+'/offer')
    .get(getAllOffers(conn))

    app.route(rootApi+'/offer/:id')
    .get(getOfferById(conn))

    app.route(rootApi+'/offer')
    .post(postOffer(conn))
}