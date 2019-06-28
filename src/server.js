//Module
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mariadb from 'mariadb';

//Module créer par nous
import {rootApi, port, secret} from '../src/config';
import {success, error} from '../src/returnjson';
import {Host, User, Password, Database} from '../src/database';

//Routes import
import routesUsers from '../src/Routes/Users'
import routesVehicles from "./Routes/Vehicles";
import routesOffers from './Routes/Offers';
import routesLocation from "./Routes/Locations";

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
        app.use(`${rootApi}/offer`, routesOffers(conn));
        app.use(`${rootApi}/admin/offer`, routesOffers(conn));
        
        app.use(`${rootApi}/vehicle`, routesVehicles(conn))
        app.use(`${rootApi}/admin/vehicle`, routesVehicles(conn))
        
        app.use(`${rootApi}/user`, routesUsers(conn))
        app.use(`${rootApi}/admin/user`, routesUsers(conn))
       
        app.use(`${rootApi}/admin/location`, routesLocation(conn))
 
        app.listen(port, () => console.log(`Server running in port ${port}`))
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.end();
    }
}

asyncConnection();
