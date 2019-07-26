//Module
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mariadb from 'mariadb';

//Module créer par nous
import {rootApi, port, secret} from '../src/config';
import {Host, User, Password, Database} from '../src/database';

//Routes import
import {anonymeRouteUsers, adminRouteUsers} from '../src/Routes/Users'
import {anonymeRouteVehicles, adminRouteVehicles} from "./Routes/Vehicles";
import {anonymeRouteOffers, adminRouteOffers} from './Routes/Offers';
import {adminRouteLocations} from "./Routes/Locations";
import {reportLateVehicle} from "./Controller/Users";

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

        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-access-token, Access-Control-Allow-Headers, Authorization, X-Requested-With"');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

        //Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(morgan('dev'));

        const mariadbConn = (req, res, next) => {
            req.conn = conn;
            next()
        };


        const dayInMilliseconds = 1000 * 60 * 60 * 24;
        //setInterval(reportLateVehicle(conn),dayInMilliseconds);

        //Routes
        app.use(`${rootApi}/offer`, mariadbConn, anonymeRouteOffers);
        app.use(`${rootApi}/admin/offer`, mariadbConn, adminRouteOffers);
        app.use(`${rootApi}/vehicle`, mariadbConn, anonymeRouteVehicles);
        app.use(`${rootApi}/admin/vehicle`, mariadbConn, adminRouteVehicles);
        app.use(`${rootApi}/user`, mariadbConn, anonymeRouteUsers);
        app.use(`${rootApi}/admin/user`, mariadbConn, adminRouteUsers);
        app.use(`${rootApi}/admin/location`, mariadbConn, adminRouteLocations);

        app.listen(port, () => console.log(`Server running in port ${port}`))
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.end();
    }
}

asyncConnection();
