<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="container">
      <h1>Les véhicules</h1>
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
          <tr v-for="vehicle in vehicles" :key="vehicle.idvehicle">
            <td>{{vehicle.idvehicle}}</td>
            <td>{{vehicle.brand}}</td>
            <td>{{vehicle.model}}</td>
            <td>{{vehicle.serialNumber}}</td>
            <td>{{vehicle.color}}</td>
            <td>{{vehicle.licensePlate}}</td>
            <td>{{vehicle.nbKm}} km</td>
            <td>{{vehicle.datePurchase}}</td>
            <td>{{vehicle.price}}€</td>
            <td v-if="vehicle.available == 1">Oui</td>
            <td v-else>Non</td>
            <td>{{vehicle.title}}</td>
            <td>{{vehicle.typeVehicle}}</td>
            <td>{{vehicle.imgVehicle}}</td>
            <td>
              <n-button
                type="warning"
                @click.native="modals.classic = true"
                v-on:click="getVehicleById(vehicle.idvehicle)"
              >Modifier</n-button>
            </td>
            <modal :show.sync="modals.classic" headerClasses="justify-content-center">
              <p v-if="errors.length">
                  <Alert type="danger">Des champs non pas étaient remplis, il vous reste <span class="alert-link">{{errors.length}}</span> à remplir</Alert>
              </p>     
              <form enctype="multipart/form-data">
                <label>Marque</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="brand" required></fg-input>
                <label>Modèle</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="model" required></fg-input>
                <label>Numéro de série</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="serialNumber" required></fg-input>
                <label>Couleur</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="color" required></fg-input>
                <label>Plaque d'immatriculation</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="licensePlate" required></fg-input>
                <label>Nombre de km</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="nbKm" required></fg-input>
                <label>Date d'achat</label>
                <fg-input>
                  <el-date-picker
                    v-model="datePurchase"
                    popper-class="date-picker-primary"
                    type="date"
                    v-on:change='onChange'
                    placeholder="Votre date de naissance"
                    required
                  ></el-date-picker>
                </fg-input>
                <label>Prix</label>
                <fg-input class="no-border" type="input" v-on:change='onChange' v-model="price" required></fg-input>
                <label>Valide</label>
                <v-select :options="yesOrNo" v-on:change='onChange' v-model="available" label="available"></v-select>
                <label>Offre</label>
                <v-select :options="offersAll" v-on:change='onChange' v-model="offersValue"></v-select>
                <label>Type de véhicule</label>
                <v-select :options="motoOrVehicle" v-on:change='onChange' v-model="typeVehicle" label="available"></v-select>
                <label>Image</label>
                <input
                  class="no-border"
                  type="file"
                  id="imgVehicle"
                  ref="imgVehicle"
                  name="imgVehicle"
                  v-on:change="handleFileUpload"
                />
                <n-button v-on:click="checkForm">Check champs</n-button>
                <n-button
                  v-if="check != false"
                  type="success"
                  @click.native="modals.classic = false"
                  v-on:click="updateVehicle"
                >Enregistrer</n-button>
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
  import {Button, Modal, FormGroupInput, Alert} from '@/components';
  import FormDataPost from '../../script/upload';
  import {DatePicker} from 'element-ui';
  import vSelect from 'vue-select';
  import "vue-select/dist/vue-select.css";

  export default {
    name: 'VehiclesListFromUser',
    components:{
      [Button.name]: Button,
      Alert,
      [Modal.name]: Modal,
      [FormGroupInput.name]: FormGroupInput,
      [DatePicker.name]: DatePicker,
      vSelect
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
        yesOrNo:['Oui', 'Non'],
        motoOrVehicle: ['Moto', 'Voiture'],
        offersMap:'',
        offersValue: '',
        offersAll: [],
        lengthVehicle: '',
        errors:[],
        check: false
      }
    },
    mounted: function() {
      axios({
        method: 'get',
        url:'http://localhost:3000/api/v1/admin/vehicle/vehicleByProprio',
        headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then((result) => {
        this.vehicles= result.data.result,
        this.lengthVehicle = (result.data.result.length)-1
        console.log(result);
        this.allOffers();
      })
      .catch((err) => console.log(err.message))  
    },
    methods: {
      updateVehicle: function (e){
        const form = this.checkForm();

        if(form != true){
          return e.preventDefault();            
        }

        const imgFormData = new FormData;
         
        const instanceDate = new  Date(this.datePurchase);
        const convertDatepicker = instanceDate.toISOString();
        const datePickerLessT = convertDatepicker.replace('T', ' ');
        const finalDate = datePickerLessT.replace('Z', '');
        this.datePurchase = finalDate;
         
        this.available = this.available == "Oui" ? 1 : 0

        for(const [keyOffers, valueOffer] of this.offersMap.entries()){
          if(valueOffer == this.offersValue){
            this.idoffers = keyOffers;
          }
        }

        console.log(this.available)

        const axiosHeaders = axios.create({
            headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "multipart/form-data"}
        })

        imgFormData.append('imgVehicle', this.imgVehicle[0]);
        imgFormData.append('brand', this.brand);
        imgFormData.append('model', this.model);
        imgFormData.append('serialNumber', this.serialNumber);
        imgFormData.append('color', this.color);
        imgFormData.append('licensePlate', this.licensePlate);
        imgFormData.append('nbKm', this.nbKm);
        imgFormData.append('datePurchase', this.datePurchase);
        imgFormData.append('price', this.price);
        imgFormData.append('available', this.available);
        imgFormData.append('offers_idoffers', this.idoffers);
        imgFormData.append('typeVehicle', this.typeVehicle);
           
        axiosHeaders.patch('http://localhost:3000/api/v1/admin/vehicle/edit/'+this.idvehicle,imgFormData)
        .then((result) => {
            this.imgVehicle = [];
            location.reload(true);
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
            this.available= result.data.result[0].available == 1? "Oui": "Non";
            this.typeVehicle= result.data.result[0].typeVehicle;
            this.imgVehicle= result.data.result[0].imgVehicle;
            this.offersValue= result.data.result[0].title;   
          })
      },
      handleFileUpload: function(){
        console.log(this.$refs.imgVehicle[this.lengthVehicle].files)
        if(this.$refs.imgVehicle[this.lengthVehicle].files[0].size <= 3000000 && 
        this.$refs.imgVehicle[this.lengthVehicle].files[0].type == 'image/png' ||
        this.$refs.imgVehicle[this.lengthVehicle].files[0].type == 'image/jpeg' 
        ){
          this.imgVehicle = this.$refs.imgVehicle[this.lengthVehicle].files
        }else{
          alert('bad format or size');
          this.imgVehicle = false
        }
        
      },
      allOffers: function(){
                axios.get('http://localhost:3000/api/v1/offer')
        .then((results) => {
          const arrayTitleOffers = [];
          const mapoffers= new Map()
          
          for(let result of results.data.result){
            arrayTitleOffers.push(result.title);
            mapoffers.set(result.idoffers, result.title)
          }
  
          this.offersMap = mapoffers
          this.offersAll = arrayTitleOffers;
          console.log(this.offersAll)
          console.log(this.offersMap)
        })
        .catch((err) => console.log(err))
      },
      checkForm: function (){
                if(this.brand && this.model && this.color && this.serialNumber  && this.licensePlate && this.nbKm &&
                this.datePurchase && this.price && this.available && this.offersValue && this.typeVehicle){
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
                if(!this.serialNumber){
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
                if(!this.available){
                    this.errors.push('La validitée est obligatoire');
                }
                if(!this.offersValue){
                    this.errors.push('L\'offre est obligatoire');
                }
                if(!this.typeVehicle){
                    this.errors.push('Le type du véhicule est obligatoire');
                }
                
                this.check = false;
                return this.errors
            },
      onChange: function(){
        this.check=false;
      }
    }
        
    
  }
</script>

<style scoped>
</style>