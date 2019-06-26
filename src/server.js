//Module
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//Module créer par nous
import { rootApi, port, secret } from '../src/config';
import { success, error } from '../src/returnjson';
import { promises } from 'fs';
import { rejects } from 'assert';
import mariadb from 'mariadb';
const app = express();
//const mariadb = require('mariadb');

const pool = mariadb.createPool({host: 'mariadb', database:'emotion', user: 'root', password: 'root'});
 
async function asyncFunction() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM location");
      console.log(rows)
    } catch (err) {
      console.log("err");
      console.log(err)
    } finally {
      if (conn) return conn.end();
    }
  }

  asyncFunction();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

//Routes


app.listen(port, () => console.log(`Server running in port ${port}`))
