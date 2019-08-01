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
        </div>
        <div class="text-center">
          <n-button v-on:click="UpdateInfo">Sauvegarder</n-button>
        </div>
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
      imgVehicle: "",
      createdBy: "",
    };
  },
  mounted() {
    this.getInfo();
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
          (this.createdBy = response.data.result[0].createdBy)
        )
      );
    },
    UpdateInfo: function() {
      let idVehicle = this.$route.params.id;

      var first = new Date(this.datePurchase);
      const convertDatepicker1 = first.toISOString();
      const datePickerLessT1 = convertDatepicker1.replace("T", " ");
      const finalDate1 = datePickerLessT1.replace("Z", "");

      axios
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
            imgVehicle: this.imgVehicle,
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
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
