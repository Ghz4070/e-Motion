import {allLocations} from '../Controller/Locations';
import {rootApi} from '../config'

export function routesLocation(app, conn) {
    ProtectedRoutes.route(rootApi + '/locations/all')
        .get(allLocations(conn));
    app.use(rootApi, ProtectedRoutes);
}