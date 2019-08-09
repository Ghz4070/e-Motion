<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <table class="table table-bordeless">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Prix</th>
                        <th>Description</th>
                        <th>Pénalité</th>
                        <th>Nombre de km</th>
                        <th>Point de fidélité de l'offre</th>
                        <th>Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="offer in offers">
                        <td>{{offer.idoffers}}</td>
                        <td>{{offer.title}}</td>
                        <td>{{offer.price}}</td>
                        <td>{{offer.description}}</td>
                        <td>{{offer.penality}}</td>
                        <td>{{offer.nbKm}}</td>
                        <td>{{offer.pointFidelityOffers}}</td>
                        <td><n-button type="warning" @click.native="modals.classic = true" v-on:click="getOffersById(offer.idoffers)">Modifier</n-button></td>
                        <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                            <label>Titre</label>
                            <fg-input
                                class="no-border"
                                type="input"
                                v-model="title"
                                required
                            ></fg-input>
                            <label>Prix</label>
                            <fg-input
                                class="no-border"
                                type="input"
                                v-model="price"
                                required
                            ></fg-input>   
                            <label>Description</label>
                            <fg-input
                                class="no-border"
                                type="input"
                                v-model="description"
                                required
                            ></fg-input>
                            <label>Pénalité</label>
                            <fg-input
                                class="no-border"
                                type="input"
                                v-model="penality"
                                required
                            ></fg-input>
                            <label>Nombre de km</label>
                            <fg-input
                                class="no-border"
                                type="input"
                                v-model="nbKm"
                                required
                            ></fg-input>
                            <label>Point de fidélié</label>
                            <fg-input
                                class="no-border"
                                type="input"
                                v-model="fidelityPoint"
                                required
                            ></fg-input>
                            <template slot="footer">
                                <n-button type="success" @click.native="modals.classic = false" v-on:click="updateOffer">Enregistrer</n-button>
                            </template>
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


    export default {
        name: 'OffersListFromUser',
        components:{
            [Button.name]: Button,
            [Modal.name]: Modal,
            [FormGroupInput.name]: FormGroupInput
        },
        data(){
            return {
                offers: [],
                offersId : '',
                modals: {
                    classic: false
                },
                title:'',
                price: '',
                description:'',
                penality:'',
                nbKm:'',
                fidelityPoint: ''
            }
        },
        methods: {
            getOffersById: function (id){
               axios({
                    method:'get',
                    url:'http://localhost:3000/api/v1/offer/'+id
                    })
                    .then((result) => {
                        console.log(result)
                        this.offersId = id;
                        this.title = result.data.result[0].title;
                        this.price = result.data.result[0].price;
                        this.description = result.data.result[0].description;
                        this.penality = result.data.result[0].penality;
                        this.nbKm = result.data.result[0].nbKm;
                        this.fidelityPoint = result.data.result[0].pointFidelityOffers;
                    })
            },
            updateOffer: function () {
                axios({
                    method:'patch',
                    url:'http://localhost:3000/api/v1/admin/offer/'+this.offersId,
                    data: {
                       title: this.title,
                       price: this.price,
                       description: this.description,
                       penality: this.penality,
                       nbKm: this.nbKm,
                       pointFidelityOffers: this.fidelityPoint
                    },
                    headers:{
                        'x-access-token':localStorage.getItem('x-access-token')
                    }
                })
                .then((result) => {
                    axios({
                        method: 'get',
                        url:'http://localhost:3000/api/v1/admin/offer/offersByProprio',
                        headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "application/x-www-form-urlencoded" }
                    })
                    .then((result) => {
                        this.offers= result.data.result
                    })
                    .catch((err) => console.log(err.message))
                })
                .catch((err) => console.log(err))
            }
        },
        mounted: function() {
            axios({
                method: 'get',
                url:'http://localhost:3000/api/v1/admin/offer/offersByProprio',
                headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then((result) => {
                this.offers= result.data.result
            })
            .catch((err) => console.log(err.message))
        },
       
    }
</script>

<style lang="scss" scoped>

</style>