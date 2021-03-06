import {
    allListVehicles,
    allListVehiclesAvailable,
    getVehicleById,
    addVehicles,
    editVehicles,
    outVehiclesOfList,
    findVehicleByCriteria,
    bookACar,
    setAvailable,
    allVehiclesNotAvailable,
    vehicleByOffers,
    getVehicleByOffer
} from '../Controller/Vehicles';
import express from 'express';
import {checkToken} from './../middleware'
import multer from 'multer';
import path from 'path';
export const adminRouteVehicles = express.Router();
export const anonymeRouteVehicles = express.Router();

let db = (req, res, next) => {
    req.sql= req.conn
    next()
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, __dirname.replace('Routes', 'img'))
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    },
    
});
const upload = multer({
    storage, 
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true)
    }, limits:{
        fileSize: 2048*2048
    } 
    }).fields([
    {name:'imgVehicle', maxCount:1}, 
    {name:'brand', maxCount:1},
    {name:'model', maxCount:1},
    {name:'serialNumber', maxCount:1},
    {name:'color', maxCount:1},
    {name:'licensePlate', maxCount:1},
    {name:'nbKm', maxCount:1},
    {name:'datePurchase', maxCount:1},
    {name:'price', maxCount:1},
    {name:'available', maxCount:1},
    {name:'idoffers', maxCount:1},
    {name:'typeVehicle', maxCount:1},
]);

anonymeRouteVehicles.route('/all')
    .get(db,allListVehicles())
anonymeRouteVehicles.route('/available')
    .get(db,allListVehiclesAvailable());
anonymeRouteVehicles.route('/notavailable')
    .get(db,allVehiclesNotAvailable())
anonymeRouteVehicles.route('/:id')
    .get(db,getVehicleById())
anonymeRouteVehicles.route('/findby')
    .get(db,findVehicleByCriteria());
anonymeRouteVehicles.route('/bookACar/:id')
    .put(db,bookACar());
anonymeRouteVehicles.route('/available/:id')
    .get(db,getVehicleByOffer());
adminRouteVehicles.route('/add')
    .post(checkToken,db,upload,addVehicles());
adminRouteVehicles.route('/edit/:id')
    .patch(checkToken,db, upload,editVehicles());

adminRouteVehicles.route('/delete/:id')
    .delete(checkToken,db,outVehiclesOfList());
adminRouteVehicles.route('/available/:id')
    .patch(checkToken,db,setAvailable());
adminRouteVehicles.route('/vehicleByProprio')
    .get(db, checkToken, vehicleByOffers())

