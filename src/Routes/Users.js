import { addUser, login, allUsers, logout } from '../Controller/Users';
import { rootApi } from '../config'
import { checkToken } from '../middleware'

export function routesUsers(app, conn, ProtectedRoutes) {
    ProtectedRoutes.use(checkToken)
    
    app.route(rootApi+'/user/add')
        .post(addUser(conn))
    app.route(rootApi+'/user/login')
        .get(login(conn))
        
    ProtectedRoutes.route('/user/all')
        .get(allUsers(conn))
    //ProtectedRoutes.get('/user/logout', logout())

    app.use(rootApi, ProtectedRoutes)
}
