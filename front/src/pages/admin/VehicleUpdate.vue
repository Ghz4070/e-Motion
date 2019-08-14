<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="photo-container"></div>
        <h3 class="title">Admin</h3>
        <p>Mise à jour informations véhicule :</p>
        <p class="category">{{ brand }} {{ model }}</p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <form enctype="multipart/form-data">
        <h3 class="title">Gerer les véhicules</h3>
        <hr />
        <div>
          <fg-input placeholder="Marque" v-model="brand"></fg-input>
          <fg-input placeholder="Modèle" v-model="model"></fg-input>
          <fg-input placeholder="Numéro de série" v-model="serialNumber"></fg-input>
          <fg-input placeholder="Couleur" v-model="color"></fg-input>
          <fg-input placeholder="Plaque d'immatriculation" v-model="licensePlate"></fg-input>
          <fg-input placeholder="Offre" v-model="offers_idoffers"></fg-input>
          <fg-input placeholder="Nombre km." v-model="nbKm"></fg-input>
          <fg-input placeholder="Prix" v-model="price"></fg-input>
          <fg-input placeholder="Disponibilité" v-model="available"></fg-input>
          <fg-input placeholder="Type" v-model="typeVehicle"></fg-input>
          <fg-input placeholder="Image" v-model="imgVehicle"></fg-input>
          <fg-input placeholder="Créée par" v-model="createdBy"></fg-input>
          <fg-input>
            <el-date-picker
              v-model="datePurchase"
              popper-class="date-picker-primary"
              type="date"
              placeholder="Date de naissance"
            ></el-date-picker>
          </fg-input>
          <div id="over" class="carImage text-center" >
            <!-- <img src="http://localhost:3000/img/aa.jpeg"/><br /> -->
            <img :src="image"/><br />
           <label>Modifier l'image</label><br />
                <input
                  class="no-border"
                  type="file"
                  id="imgVehicle"
                  ref="imgVehicle"
                  name="imgVehicle"
                  v-on:change="handleFileUpload"
                />
            </div>
          
        </div>
        <div class="text-center">
          <n-button v-on:click="UpdateInfo">Sauvegarder</n-button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, FormGroupInput as FgInput, Modal } from "@/components";
import axios from "axios";
import { DatePicker } from "element-ui";
import { setTimeout } from "timers";

export default {
  name: "LocationUpdate",
  props: {},
  components: {
    [Button.name]: Button,
    FgInput,
    Modal
  },
  data() {
    return {
      offers_idoffers:"",
      brand: "",
      model: "",
      serialNumber: "",
      color: "",
      licensePlate: "",
      nbKm: "",
      datePurchase: "",
      price: "",
      available: "",
      typeVehicle: "",
      imgVehicle: '',
      createdBy: "",
      image: ""
    };
  },
  mounted() {
    this.getInfo();
    /* this.image = "http://localhost:3000/img/"+this.imgVehicle; */
  },
  updated() {
    // this.getInfo()
  },
  methods: {
    getInfo: function() {
      let idVehicle = this.$route.params.id;
      axios({
        url: "http://localhost:3000/api/v1/vehicle/" + idVehicle,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(
        response => (
          (this.brand = response.data.result[0].brand),
          (this.model = response.data.result[0].model),
          (this.serialNumber = response.data.result[0].serialNumber),
          (this.color = response.data.result[0].color),
          (this.licensePlate = response.data.result[0].licensePlate),
          (this.nbKm = response.data.result[0].nbKm),
          (this.datePurchase = response.data.result[0].datePurchase),
          (this.price = response.data.result[0].price),
          (this.offers_idoffers = response.data.result[0].offers_idoffers),
          (this.available = response.data.result[0].available),
          (this.typeVehicle = response.data.result[0].typeVehicle),
          (this.imgVehicle = response.data.result[0].imgVehicle),
          (this.createdBy = response.data.result[0].createdBy),
          this.image = "http://localhost:3000/img/"+this.imgVehicle
        )
      );
    },
    UpdateInfo: function() {

      const imgFormData = new FormData;

      /* let idVehicle = this.$route.params.id; */

      var first = new Date(this.datePurchase);
      const convertDatepicker1 = first.toISOString();
      const datePickerLessT1 = convertDatepicker1.replace("T", " ");
      const finalDate1 = datePickerLessT1.replace("Z", "");

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
        .then((result) => {
          console.log(result)
          axios({
            method: 'get',
                        url:'http://localhost:3000/api/v1/admin/vehicle/vehicleByProprio',
            headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "multipart/form-data" }
            })
          .then((results) => {
            this.vehicles= results.data.result
            console.log(results);
            this.imgVehicle = [];
          })
          .catch((err) => console.log(err.message))
          })
        .catch((err) => console.log(err))

      /* axios
        .patch(
          "http://localhost:3000/api/v1/admin/vehicle/edit/" + idVehicle,
          {
            brand: this.brand,
            model: this.model,
            serialNumber: this.serialNumber,
            color: this.color,
            licensePlate: this.licensePlate,
            nbKm: this.nbKm,
            offers_idoffers: this.offers_idoffers,
            datePurchase: finalDate1,
            price: this.price,
            available: this.available,
            typeVehicle: this.typeVehicle,
            imgVehicle: this.imgVehicle[0],
            createdBy: this.createdBy
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        )
        .then(result => {
          console.log(result);
          if (result.data.status == "success") {
            this.$router.push("/admin/vehicles");
          }
          this.imgVehicle = [];
        })
        .catch(err => console.log(err)); */
    },
    handleFileUpload: function(){
        console.log(this.$refs.imgVehicle.files)
        this.imgVehicle = this.$refs.imgVehicle.files
      }
  }
};
</script>

<style scoped>
.carImage {
  object-fit: cover;
  width: 500px;
  height: 337px;
margin-bottom:50px;
margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
