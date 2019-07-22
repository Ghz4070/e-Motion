//Module
import express from 'express';
import bodyParser from 'body-parser';
import sqlFixtures from 'sql-fixtures';
import morgan from 'morgan';
import mariadb from 'mariadb';
import mysql from 'mysql'; //pour les fixtures

//Module créer par nous
import {rootApi, port, secret} from '../src/config';
import {success, error} from '../src/returnjson';
import {Host, User, Password, Database} from '../src/database';

//Routes import
import {routesUsers} from '../src/Routes/Users'
import {routesVehicles} from "./Routes/Vehicles";
import {routesOffers} from './Routes/Offers';
import {routesLocation} from "./Routes/Locations";

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
        const ProtectedRoutes = express.Router();

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

        app.listen(port, () => console.log(`Server running in port ${port}`))
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.end();
    }
}

asyncConnection();
