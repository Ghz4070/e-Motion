import {
    allListVehicles,
    allListVehiclesAvailable,
    getVehicleById,
    editVehicles,
    addVehicles,
    outVehiclesOfList
} from '../Controller/Vehicles';
import {rootApi} from '../config'
import {checkToken} from '../middleware';

export function routesVehicles(app, conn, ProtectedRoutes) {
    ProtectedRoutes.use(checkToken);

    app.route(rootApi + '/vehicles/all')
        .get(allListVehicles(conn));

    app.route(rootApi + '/vehicles/available')
        .get(allListVehiclesAvailable(conn));

    app.route(rootApi + '/vehicles/:id')
        .get(getVehicleById(conn));

    ProtectedRoutes.route('/vehicles/edit/:id')
        .patch(editVehicles(conn));


    ProtectedRoutes.route('/vehicles/add')
        .post(addVehicles(conn));

    ProtectedRoutes.route('/vehicles/delete/:id')
        .delete(outVehiclesOfList(conn));

    app.use(rootApi, ProtectedRoutes);
}

