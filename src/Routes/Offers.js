import {
    getOfferById,
    getAllOffers,
    postOffer,
    removeOffer,
    updateOffer
} from '../Controller/Offers';
import {rootApi} from '../config';

export function routesOffers(app, conn, ProtectedRoutes) {
    app.route(rootApi + '/offer')
        .get(getAllOffers(conn));

    app.route(rootApi + '/offer/:id')
        .get(getOfferById(conn));

    ProtectedRoutes.route(rootApi + '/admin/offer')
        .post(postOffer(conn));
    app.use(rootApi, ProtectedRoutes);

    ProtectedRoutes.route(rootApi + '/admin/offer/:id')
        .delete(removeOffer(conn))
        .patch(updateOffer(conn));
    app.use(rootApi, ProtectedRoutes);
}