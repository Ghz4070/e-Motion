//Module
import express from 'express';
import bodyParser from 'body-parser';
import sqlFixtures from 'sql-fixtures';
import morgan from 'morgan';
import mariadb from 'mariadb';
import mysql from 'mysql'; //pour les fixtures

//Module créer par nous
import {rootApi, port, secret} from '../src/config';
import {Host, User, Password, Database} from '../src/database';

//Routes import
import { anonymeRouteUsers, adminRouteUsers } from '../src/Routes/Users'
import { anonymeRouteVehicles, adminRouteVehicles } from "./Routes/Vehicles";
import { anonymeRouteOffers, adminRouteOffers } from './Routes/Offers';
import { adminRouteLocations } from "./Routes/Locations";


const pool = mariadb.createPool({
    host: Host,
    user: User,
    password: Password,
    database: Database,
});

async function asyncConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('hello');

        const app = express();
        //const ProtectedRoutes = express.Router();

        //Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(morgan('dev'));

        //Routes
        routesUsers(app, conn, ProtectedRoutes);
        routesVehicles(app, conn, ProtectedRoutes);
        routesOffers(app, conn, ProtectedRoutes);
        routesLocation(app, conn, ProtectedRoutes);

        //Fixtures
        let dbConfig = {
            client: 'mysql',
            connection: {
                host: Host,
                user: User,
                password: Password,
                database: Database,
            }
        };

        let dataSpec = {
            users: {
                firstname: 'bobo',
                lastname: 'bobo',
                birthday: '2019-02-01',
                address: 'lknq',
                phoneNumber: '0000000',
                driverLicense: '929ZJ',
                password: 'keke',
                email: 'bob@example.com',
                pointFidelity: '0',
                username: 'Bob',
                offers_idoffers: '2'
            }
        };

        sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
        });
      
        const mariadbConn = (req, res, next)=> {
            req.conn = conn;
            next()
        }

        //Routes
        app.use(`${rootApi}/offer`, mariadbConn,anonymeRouteOffers);
        app.use(`${rootApi}/admin/offer`, mariadbConn,adminRouteOffers);
        app.use(`${rootApi}/vehicle`, mariadbConn, anonymeRouteVehicles);
        app.use(`${rootApi}/admin/vehicle`, mariadbConn,adminRouteVehicles);
        app.use(`${rootApi}/admin/location`, mariadbConn ,adminRouteLocations);
        app.use(`${rootApi}/user`, mariadbConn,anonymeRouteUsers);
        app.use(`${rootApi}/admin/user`, mariadbConn, adminRouteUsers);
 
        app.listen(port, () => console.log(`Server running in port ${port}`))
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.end();
    }
}

asyncConnection();
