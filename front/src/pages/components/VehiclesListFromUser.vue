<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
           <table class="table table-bordeless">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Numéro de série</th>
                        <th>Couleur</th>
                        <th>Plaque d'immatriculation</th>
                        <th>Nombre de km</th>
                        <th>Date d'achat</th>
                        <th>Prix</th>
                        <th>Valide</th>
                        <th>Offre</th>
                        <th>Type de véhicule</th>
                        <th>Image</th>
                        <th>Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vehicle in vehicles">
                        <td>{{vehicle.idvehicle}}</td>
                        <td>{{vehicle.brand}}</td>
                        <td>{{vehicle.model}}</td>
                        <td>{{vehicle.serialNumber}}</td>
                        <td>{{vehicle.color}}</td>
                        <td>{{vehicle.licensePlate}}</td>
                        <td>{{vehicle.nbKm}}</td>
                        <td>{{vehicle.datePurchase}}</td>
                        <td>{{vehicle.price}}</td>
                        <td>{{vehicle.available}}</td>
                        <td>{{vehicle.offers_idoffers}}</td>
                        <td>{{vehicle.typeVehicle}}</td>
                        <td>{{vehicle.imgVehicle}}</td>
                        <td><n-button type="warning" @click.native="modals.classic = true" v-on:click="getVehicleById(vehicle.idvehicle)">Modifier</n-button></td>
                        <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                            <form enctype="multipart/form-data">
                                <label>Marque</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="brand"
                                    required
                                ></fg-input>
                                <label>Modèle</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="model"
                                    required
                                ></fg-input>   
                                <label>Numéro de série</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="serialNumber"
                                    required
                                ></fg-input>
                                <label>Couleur</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="color"
                                    required
                                ></fg-input>
                                <label>Plaque d'immatriculation</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="licensePlate"
                                    required
                                ></fg-input>
                                <label>Nombre de km</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="nbKm"
                                    required
                                ></fg-input>
                                <label>Date d'achat</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="datePurchase"
                                    required
                                ></fg-input>
                                <label>Prix</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="price"
                                    required
                                ></fg-input>
                                <label>Valide</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="available"
                                    required
                                ></fg-input>
                                <label>Offre</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="idoffers"
                                    required
                                ></fg-input>
                                <label>Type de véhicule</label>
                                <fg-input
                                    class="no-border"
                                    type="input"
                                    v-model="typeVehicle"
                                    required
                                ></fg-input>
                                <label>Image</label>
                                <input type="file" id="imgVehicle" ref="imgVehicle" name="imgVehicle"  v-on:change="handleFileUpload">
                                <n-button type="success" @click.native="modals.classic = false" v-on:click="updateVehicle">Enregistrer</n-button>
                            </form>
                        </modal>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Button, Modal, FormGroupInput} from '@/components';
    import FormDataPost from '../../script/upload';

    export default {
        name: 'VehiclesListFromUser',
        components:{
            [Button.name]: Button,
            [Modal.name]: Modal,
            [FormGroupInput.name]: FormGroupInput,
        },
        data(){
            return {
                vehicles: [],
                idvehicle:'',
                brand:'',
                model:'',
                serialNumber:'',
                color:'',
                licensePlate:'',
                nbKm:'',
                datePurchase:'',
                price:'',
                available:'',
                idoffers:'',
                typeVehicle:'',
                imgVehicle:'',
                modals: {
                    classic: false
                },
            }
        },
        mounted: function() {
            axios({
                method: 'get',
                url:'http://localhost:3000/api/v1/admin/vehicle/vehicleByProprio',
                headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then((result) => {
                this.vehicles= result.data.result
                console.log(result);
            })
            .catch((err) => console.log(err.message))
        },
        methods: {
            updateVehicle: async function (){
                const imgFormData = new FormData
                const axiosHeaders = axios.create({
                        headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "multipart/form-data"}
                })

                imgFormData.append('imgVehicle', this.imgVehicle[0])
                imgFormData.append('brand', this.brand)
                imgFormData.append('model', this.model)
                imgFormData.append('serialNumber', this.serialNumber)
                imgFormData.append('color', this.color)
                imgFormData.append('licensePlate', this.licensePlate)
                imgFormData.append('nbKm', this.nbKm)
                imgFormData.append('datePurchase', this.datePurchase)
                imgFormData.append('price', this.price)
                imgFormData.append('available', this.available)
                imgFormData.append('offers_idoffers', this.idoffers)
                imgFormData.append('typeVehicle', this.typeVehicle)
                    
                axiosHeaders.patch('http://localhost:3000/api/v1/admin/vehicle/edit/'+this.idvehicle,imgFormData)
                .then((result) => {
                    console.log(result)
                    axios({
                        method: 'get',
                        url:'http://localhost:3000/api/v1/admin/vehicle/vehicleByProprio',
                        headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "multipart/form-data" }
                        })
                    .then((results) => {
                        this.vehicles= results.data.result
                        console.log(results);
                    })
                    .catch((err) => console.log(err.message))
                    })
                .catch((err) => console.log(err))
            },
            getVehicleById: function(id){
                axios({
                    method:'get',
                    url:'http://localhost:3000/api/v1/vehicle/'+id
                    })
                    .then((result) => {
                        console.log(result)
                        this.idvehicle = id;
                        this.brand= result.data.result[0].brand;
                        this.model= result.data.result[0].model;
                        this.serialNumber= result.data.result[0].serialNumber;
                        this.color= result.data.result[0].color;
                        this.licensePlate= result.data.result[0].licensePlate;
                        this.nbKm= result.data.result[0].nbKm;
                        this.datePurchase= result.data.result[0].datePurchase;
                        this.price= result.data.result[0].price;
                        this.available= result.data.result[0].available;
                        this.idoffers= result.data.result[0].offers_idoffers;
                        this.typeVehicle= result.data.result[0].typeVehicle;
                        this.imgVehicle= result.data.result[0].imgVehicle;
                    })
            },
            handleFileUpload: function(){
                this.imgVehicle = this.$refs.imgVehicle[3].files
            }
        }
       
    }
</script>

<style scoped>

</style>