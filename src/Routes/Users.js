import { addUser, login, allUsers, logout } from '../Controller/Users';
import { rootApi } from '../config'
import { checkToken } from '../middleware'
import express from 'express';

module.exports = (_db) => {
    const db = _db;

    const anonymeRoute = express.Router();
    const adminRoute = express.Router();
    
    adminRoute.use(checkToken);

    anonymeRoute.route('/add')
        .post(addUser(db))
    anonymeRoute.route('/login')
        .get(login(db))
    adminRoute.route('/all')
        .get(allUsers(db))

    return [anonymeRoute, adminRoute]
}
