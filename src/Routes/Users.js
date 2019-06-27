import { addUser } from '../Controller/Users';
import { rootApi } from '../config'

export function routesUsers(app, conn) {
    app.route(rootApi+'/user/add')
        .post(addUser(conn))
}
