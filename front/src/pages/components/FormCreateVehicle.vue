<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <div class="text-left">
            <n-button type="default" v-on:click="previousPage">Retour page précédente</n-button>
            </div>
            <div class="row">
                <card class="card-signup" header-classes="text-center" color="orange">
                    <template slot="header">
                        <h3 class="card-title title-up">formulaire vehicule</h3>
                    </template>
                    <p v-if="errors.length">
                        <Alert type="danger">Des champs non pas étaient remplis, il vous reste <span class="alert-link">{{errors.length}}</span> à remplir</Alert>
                    </p>
                    <p v-if="status">
                        <alert type="success">Le véhicule a été ajouté avec succès, vous allez être redirectionné vers les véhicules</alert>
                    </p>
                    <template>

                        <fg-input
                                class="no-border"
                                placeholder="Marque"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="brand"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Modele"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="model"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Numero de serie"
                                addon-left-icon="now-ui-icons ui-1_email-85"
                                v-model="numerSerie"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="couleur"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="color"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="N° d'immatriculation"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="licensePlate"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Nombre de kilometre"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="nbKm"
                        >
                        </fg-input>

                        <fg-input>
                            <el-date-picker
                                    class="no-border "
                                    popper-class="date-picker-primary"
                                    type="date"
                                    placeholder="date d'achat"
                                    v-model="datePurchase"
                            >
                            </el-date-picker>
                        </fg-input>
                        <fg-input
                                class="no-border pt-2"
                                placeholder="Prix"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="price"
                        >
                        </fg-input>

                        <n-radio inline class="mb-3" v-model="typeVehicule" label="voiture">Voiture</n-radio>
                        <n-radio inline class="mb-3" v-model="typeVehicule" label="scooter">Scooter</n-radio>

                        <v-select :options="offersAll" v-model="offerValue" label="titleOffers">
                        </v-select>

                        <input class="mt-3" ref="imgVehicle" id="imgVehicle" name="imgVehicle" v-on:change="handleFileUpload" type="file">

                    </template>
                    <div class="card-footer text-center">
                        <n-button type="neutral" round size="lg" v-on:click="createVehicle">Créer</n-button>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import {Card, FormGroupInput, Button, Radio, Alert} from '@/components';
    import {DatePicker} from 'element-ui';
    import axios from 'axios';
    
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default {
        name: 'FormCreateVehicle',
        components: {
            Card,
            vSelect,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            Alert,
            [FormGroupInput.name]: FormGroupInput,
            [Radio.name]: Radio,
        },
        data() {
            return {
                imgVehicle: '',
                typeVehicule: '',
                datePurchase: '',
                price: '',
                nbKm: '',
                licensePlate: '',
                color: '',
                numerSerie: '',
                model: '',
                brand: '',
                offerValue: '',
                offersAll: [],
                offersMap: '',
                idOffers: '',
                errors: [],
                status: false,
            }
        },
        methods: {
            createVehicle: function (e) {
                const form = this.checkForm();

                if(form != true){
                    return e.preventDefault();            
                }
                       
                const convertDatepicker = this.datePurchase.toISOString();
                const datePickerLessT = convertDatepicker.replace('T', ' ');
                const finalDate = datePickerLessT.replace('Z', '');
                this.datePurchase = finalDate;

                for(const [keyOffer, valueOffer] of this.offersMap.entries()){
                    if(valueOffer == this.offerValue){
                        this.idOffers = keyOffer;
                    }
                }

                const axiosHeaders = axios.create({
                    headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "multipart/form-data"}
                });

                const imgFormData = new FormData;

                imgFormData.append('imgVehicle', this.imgVehicle[0]);
                imgFormData.append('typeVehicle', this.typeVehicule);
                imgFormData.append('available', 1);
                imgFormData.append('datePurchase', this.datePurchase);
                imgFormData.append('price', this.price);
                imgFormData.append('nbKm', this.nbKm);
                imgFormData.append('licensePlate', this.licensePlate);
                imgFormData.append('color', this.color);
                imgFormData.append('serialNumber', this.numerSerie);
                imgFormData.append('model', this.model);
                imgFormData.append('brand',this.brand);
                imgFormData.append('offers_idoffers', this.idOffers);

                axiosHeaders.post('http://localhost:3000/api/v1/admin/vehicle/add', imgFormData)
                .then((result) => {
                    this.status = true;
                    setTimeout(()=> {
                        this.$router.push('/vehicule');
                    }, 3000);
                    console.log(result)
                })
                .catch((err) => console.log(err))
            },
            previousPage: function() {
                this.$router.go(-1)
            },
            handleFileUpload: function(){
                if(this.$refs.imgVehicle.files[0].size <= 3000000 && 
                this.$refs.imgVehicle.files[0].type == 'image/png' ||
                this.$refs.imgVehicle.files[0].type == 'image/jpeg' 
                ){
                    this.imgVehicle = this.$refs.imgVehicle.files
                }else{
                    alert('bad format or size');
                    this.imgVehicle = false
                }
            },
            checkForm: function (){
                if(this.brand && this.model && this.color && this.numerSerie  && this.licensePlate && this.nbKm &&
                this.datePurchase && this.price && this.offerValue && this.typeVehicule){
                    this.check=true;
                    return true;
                }
                
                this.errors =[]
                
                if(!this.brand){
                    this.errors.push('La marque est obligatoire');
                }
                if(!this.color){
                  this.errors.push('La couleur est obligatoire');
                }
                if(!this.model){
                    this.errors.push('Le modèle est obligatoire');
                }
                if(!this.numerSerie){
                    this.errors.push('Le numéro de série est obligatoire');
                }
                if(!this.licensePlate){
                    this.errors.push('La plaque d\'immatriculation est obligatoire');
                }
                if(!this.nbKm){
                    this.errors.push('Le nombre de km est obligatoire')
                }
                if(!this.datePurchase){
                    this.errors.push('La date est obligatoire');
                }
                if(!this.price){
                    this.errors.push('Le prix est obligatoire');
                }
                if(!this.offerValue){
                    this.errors.push('L\'offre est obligatoire');
                }
                if(!this.typeVehicule){
                    this.errors.push('Le type du véhicule est obligatoire');
                }
                
                return this.errors
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/api/v1/offer') //recup all offers
                .then(response => {
                    const arrayTitlesOffers = [];
                    const mapOffers= new Map();

                    for(let result of response.data.result){
                        arrayTitlesOffers.push(result.title);
                        mapOffers.set(result.idoffers, result.title);
                    }

                    this.offersMap = mapOffers;
                    this.offersAll = arrayTitlesOffers;
                })
                .catch(error => console.log(error))
        }
    }
</script>
<style>
</style>