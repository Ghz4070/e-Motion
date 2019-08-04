<template>
  <div>
    <div class="page-header page-header-small">
      <parallax class="page-header-image" style="background-image: url('img/bg6.jpg')"></parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">Louer votre véhicule ici.</h1>
          <div class="text-center">
            <a href="#pablo" class="btn btn-primary btn-icon btn-round">
              <i class="fab fa-facebook-square"></i>
            </a>
            <a href="#pablo" class="btn btn-primary btn-icon btn-round">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#pablo" class="btn btn-primary btn-icon btn-round">
              <i class="fab fa-google-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-team text-center">
      <div class="container">
        <h2 class="title">Récapitulatif de nos offres</h2>
        <div class="team">
          <div class="row">
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="img/avatar.jpg"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">Romina Hadid</h4>
                <p class="category text-primary">Model</p>
                <p class="description">
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some
                  <a
                    href="#"
                  >links</a> for people to be able to follow
                  them outside the site.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="img/ryan.jpg"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">Ryan Tompson</h4>
                <p class="category text-primary">Designer</p>
                <p class="description">
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some
                  <a
                    href="#"
                  >links</a> for people to be able to follow
                  them outside the site.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="img/eva.jpg"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">Eva Jenner</h4>
                <p class="category text-primary">Fashion</p>
                <p class="description">
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some
                  <a
                    href="#"
                  >links</a> for people to be able to follow
                  them outside the site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-contact-us text-center">
      <div class="container">
        <h2 class="title">Choisisez l'offres et le véhicule</h2>
        <p class="description">Location Car Concept.</p>
        <div class="row">
          <div class="col-lg-6 text-center ml-auto mr-auto col-md-8">
            <fg-input class="input-lg">
              <el-date-picker
                v-model="startDate"
                popper-class="date-picker-primary has-danger"
                type="date"
                placeholder="Date de début"
                required
              ></el-date-picker>
            </fg-input>
            <fg-input class="input-lg">
              <el-date-picker
                v-model="endDate"
                popper-class="date-picker-primary has-danger"
                type="date"
                placeholder="Date de fin"
                required
              ></el-date-picker>
            </fg-input>
            <fg-input
              class="input-lg"
              placeholder="Point de fidélité utiliser"
              v-model="pointFidelityUsed"
              addon-left-icon="now-ui-icons users_circle-08"
            ></fg-input>
            <fg-input
              class="input-lg"
              placeholder="Prix final"
              v-model="finalPrice"
              addon-left-icon="now-ui-icons ui-1_email-85"
            ></fg-input>
            <label>Choix de l'offre</label>
            <v-select
              :options="listOffer"
              v-model="offers_idoffers"
              :reduce="titleOffers => titleOffers.idOffers"
              label="titleOffers"
            ></v-select>
            <br />
            <label>Choix de la voiture</label>
            <v-select
              :options="listVehicule"
              v-model="vehicle_idvehicle"
              :reduce="titleVehicles => titleVehicles.idVehicles"
              label="titleVehicles"
            ></v-select>
            <div class="send-button">
              <n-button
                v-on:click="setLocation"
                type="primary"
                round
                block
                size="lg"
              >Soumettre la demande de location</n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, FormGroupInput } from "@/components";
import { DatePicker } from "element-ui";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "location",
  bodyClass: "location-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    vSelect
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      pointFidelityUsed: "",
      status: "En attente",
      finalPrice: "",
      offers_idoffers: "",
      vehicle_idvehicle: "",
      listOffer: [],
      listVehicule: []
    };
  },
  methods: {
    setLocation: function() {
      /*  var first = new Date(this.startDate); */
      const convertDatepicker1 = this.startDate.toISOString();
      const datePickerLessT1 = convertDatepicker1.replace("T", " ");
      const finalDate1 = datePickerLessT1.replace("Z", "");

      /* var second = new Date(this.endDate); */
      const convertDatepicker2 = this.endDate.toISOString();
      const datePickerLessT2 = convertDatepicker2.replace("T", " ");
      const finalDate2 = datePickerLessT2.replace("Z", "");

      axios
        .post(
          "http://localhost:3000/api/v1/location/add",
          {
            startDate: finalDate1,
            endDate: finalDate2,
            pointFidelityUsed: this.pointFidelityUsed,
            status: this.status,
            finalPrice: this.finalPrice,
            offers_idoffers: this.offers_idoffers,
            vehicle_idvehicle: this.vehicle_idvehicle
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
            this.account =
              "Votre compte a été créé, vous allez être redirectionné dans moins de 5 secondes";
            this.hideOrNot = "donthide";
            setTimeout(() => {
              this.$router.push("/");
            }, 5000);
          }
        })
        .catch(err => console.log(err));
    },
    getOffer: function() {
    axios
      .get("http://localhost:3000/api/v1/offer")
      .then(response => {
        for (let i in response.data.result) {
          this.idOffers = response.data.result[i].idoffers;
          this.titleOffers = response.data.result[i].title;
          this.listOffer.push({
            'idOffers': this.idOffers,
            'titleOffers': this.titleOffers
          });
        }
      })
      .catch(error => console.log(error));
    },
    getVehicule: function() {
        axios
      .get("http://localhost:3000/api/v1/vehicle/available")
      .then(response => {
        for (let i in response.data.result) {
          this.idVehicles = response.data.result[i].idvehicle;
          this.brand = response.data.result[i].brand;
          this.model = response.data.result[i].model;
          this.listVehicule.push({
            'idVehicles': this.idVehicles,
            'titleVehicles': this.brand +' - '+ this.model
          });
        }
      })
      .catch(error => console.log(error));
    }
  },
  mounted() {
    this.getOffer();
    this.getVehicule();
  }
};
</script>
<style></style>
