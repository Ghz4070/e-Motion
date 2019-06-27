import {allLocations} from '../Controller/Locations';
import {rootApi} from '../config'

export function routesLocation(app, conn) {
    app.route(rootApi + '/locations/all')
        .get(allLocations(conn));
}