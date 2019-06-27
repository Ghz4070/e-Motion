import { addUser, login } from '../Controller/Users';
import { rootApi } from '../config'

export function routesUsers(app, conn) {
    app.route(rootApi+'/user/add')
        .post(addUser(conn))
    app.route(rootApi+'/user/login')
        .get(login(conn))
}
