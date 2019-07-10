import { addUser, login, allUsers, logout, seeInformationAccount, updateInformationAccount, deleteAccount, userById } from '../Controller/Users';
import { checkToken } from '../middleware'
import express from 'express';

const db = (req, res, next) => {
    req.sql = req.conn;
    next();
}

export const anonymeRouteUsers = express.Router();
export const adminRouteUsers = express.Router();

anonymeRouteUsers.route('/add')
    .post(db,addUser())
anonymeRouteUsers.route('/login')
    .get(db,login())
adminRouteUsers.route('/all')
    .get(db,checkToken,allUsers())
adminRouteUsers.route('/')
    .get(db, checkToken, seeInformationAccount())
adminRouteUsers.route('/modify')
    .patch(db, checkToken, updateInformationAccount())
adminRouteUsers.route('/delete/:id')
    .delete(db, checkToken, deleteAccount())
adminRouteUsers.route('/:id')
    .get(db, checkToken, userById())

