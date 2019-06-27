import { getAllOffers } from '../Controller/Offers';
import { rootApi } from '../config';

export function routesOffers(app, conn) {
    app.route(rootApi+'/offer')
    .get(getAllOffers(conn))
}