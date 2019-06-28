import {
    allLocations
} from '../Controller/Locations';
import { rootApi } from '../config';
import { checkToken } from '../middleware';

export function routesLocation(app, conn, ProtectedRoutes) {
    ProtectedRoutes.use(checkToken)
    
    ProtectedRoutes.route(rootApi + '/locations/all')
        .get(allLocations(conn));
    app.use(rootApi, ProtectedRoutes);
}