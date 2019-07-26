import {
    addUser,
    login,
    allUsers,
    logout,
    seeInformationAccount,
    updateInformationAccount,
    deleteAccount,
    userById,
    updateInformationAccountForAdmin,
    forgotPassword,
    resetPassword,
    activateAccount,
    userHistorical,
    getLastLocation,
    addPropioUserByAdmin
} from '../Controller/Users';
import {checkToken} from '../middleware'
import express from 'express';

const db = (req, res, next) => {
    req.sql = req.conn;
    next();
};

export const anonymeRouteUsers = express.Router();
export const adminRouteUsers = express.Router();

anonymeRouteUsers.route('/add')
    .post(db, addUser());
anonymeRouteUsers.route('/login')
    .post(db, login());
anonymeRouteUsers.route('/forgot_password')
    .get(db, forgotPassword());
anonymeRouteUsers.route('/reset_password')
    .post(db, resetPassword());
anonymeRouteUsers.route('/activate_account')
    .get(db, activateAccount());
anonymeRouteUsers.route('/historical/:id')
    .get(db, userHistorical());
anonymeRouteUsers.route('/lastLocation/:id')
    .get(db, getLastLocation());
adminRouteUsers.route('/all')
    .get(db, checkToken, allUsers());
adminRouteUsers.route('/')
    .get(db, checkToken, seeInformationAccount());
adminRouteUsers.route('/modify')
    .patch(db, checkToken, updateInformationAccount());
adminRouteUsers.route('/delete/:id')
    .delete(db, checkToken, deleteAccount());
adminRouteUsers.route('/:id')
    .get(db, checkToken, userById());
adminRouteUsers.route('/update/:id')
    .patch(db, checkToken, updateInformationAccountForAdmin());
adminRouteUsers.route('/addByAdmin')
    .post(db, checkToken, addPropioUserByAdmin());