import {allListVehicles, allListVehiclesAvailable, getVehicleById, editVehicles,addVehicles} from '../Controller/Vehicles';
import {rootApi} from '../config'

export function routesVehicles(app, conn) {
    app.route(rootApi + '/vehicles/all')
        .get(allListVehicles(conn));

    app.route(rootApi + '/vehicles/available')
        .get(allListVehiclesAvailable(conn));

    app.route(rootApi + '/vehicles/:id')
        .get(getVehicleById(conn));
  
    app.route(rootApi + '/vehicles/edit/:id')
        .patch(editVehicles(conn));

    app.route(rootApi + '/vehicles/add')
        .post(addVehicles(conn));
}

