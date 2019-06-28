import {
    allLocations,
    getOneLocation,
} from '../Controller/Locations';
import {rootApi} from '../config';
import {checkToken} from '../middleware';

export function routesLocation(app, conn, ProtectedRoutes) {
    ProtectedRoutes.use(checkToken);

    ProtectedRoutes.route('/locations/all')
        .get(allLocations(conn));
    app.use(rootApi, ProtectedRoutes);

    ProtectedRoutes.route('/locations/:id')
        .get(getOneLocation(conn));

    app.use(rootApi, ProtectedRoutes);
}