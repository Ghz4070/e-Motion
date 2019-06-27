import {allListVehicle} from '../Controller/Vehicles';
import {rootApi} from '../config'

export function routesVehicles(app, conn) {
    app.route(rootApi + '/vehicles/all')
        .get(allListVehicle(conn))
}
