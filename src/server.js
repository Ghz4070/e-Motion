//Module
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//Module créer par nous
import { rootApi, port, secret } from '../src/config';
import { success, error } from '../src/returnjson';
import { promises } from 'fs';
import { rejects } from 'assert';

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

//Routes


app.listen(port, () => console.log(`Server running in port ${port}`))
