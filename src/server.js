//Module
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mariadb from 'mariadb';
//Module créer par nous
import { rootApi, port, secret } from '../src/config';
import { success, error } from '../src/returnjson';
import { Host, User, Password, Database } from '../src/database';

const pool = mariadb.createConnection({
    host: Host,
    user: User,
    password: Password,
    database: Database,

})
.then((conn) => {
    console.log('a')
})
.catch((err) => console.log(err))

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));



//Routes


app.listen(port, () => console.log(`Server running in port ${port}`))
