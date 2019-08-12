<template>
  <div>
    <div class="page-header page-header-small">
      <parallax class="page-header-image" style="background-image: url('img/bg6.jpg')"></parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">Louer votre véhicule ici.</h1>
          <div class="text-center">
            <a href class="btn btn-primary btn-icon btn-round">
              <i class="fab fa-facebook-square"></i>
            </a>
            <a href class="btn btn-primary btn-icon btn-round">
              <i class="fab fa-twitter"></i>
            </a>
            <a href class="btn btn-primary btn-icon btn-round">
              <i class="fab fa-google-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-team text-center">
      <div class="container">
        <h2 class="title">Récapitulatif de nos offres</h2>
        <tabs type="primary" tabContentClasses="tab-subcategories" square centered class="row layout">
          <tab-pane v-for="offer in offers" :key="offer.ifoffers">
            <span slot="label">
              <i class="now-ui-icons objects_umbrella-13"></i>
              {{ offer.title }}
            </span>
            <card
              style="width: 50rem;"
              class="card-nav-tabs text-center"
              header-classes="card-header-warning"
            >
              <div slot="header" class="mt-2">Offre - {{ offer.idoffers }}</div>
              <h4 class="card-title">{{ offer.title }}</h4>
              <p class="card-text">{{ offer.description }}</p>
              <card style="width: 20rem;">
                <ul slot="raw-content" class="list-group list-group-flush">
                  <li class="list-group-item">Nombre de km : {{ offer.nbKm }} km</li>
                  <li
                    class="list-group-item"
                  >Récompense : {{ offer.pointFidelityOffers }} point offert</li>
                  <li class="list-group-item">Jour en pus : {{ offer.penality }}€/jours</li>
                  <li class="list-group-item">Prix : {{ offer.price }}€</li>
                </ul>
              </card>
            </card>
          </tab-pane>
        </tabs>
        <div class="info">
          <alert type="info">
            {{ info.username }}, Vous disposez de {{ info.pointFidelity }} points de fidélité à utiliser dès aujourd'hui.
            </alert>
        </div>
      </div>
    </div>
    <div class="section section-contact-us text-center">
      <div>
      </div>
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
            <label>Choix de l'offre</label>
            <v-select
              @input="getVehicule"
              :options="listOffer"
              v-model="offers_idoffers"
              :reduce="titleOffers => titleOffers.idOffers"
              label="titleOffers"
            ></v-select>
            <br />
            <label>Choix de la voiture</label>
            <v-select
              @change="getVehicule()"
              :options="listVehicule"
              v-model="vehicle_idvehicle"
              :reduce="titleVehicles => titleVehicles.idVehicles"
              label="titleVehicles"
            ></v-select>
            <br />
            <div v-if="price && listVehicule.length>0">
            Le prix final est de : <b>{{ price }}</b> €.
            </div>
            <br />
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
import { Button, FormGroupInput, Tabs, TabPane, Card, Alert } from "@/components";
import { DatePicker } from "element-ui";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "location",
  bodyClass: "index-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    vSelect,
    Tabs,
    TabPane,
    Card,
    Alert
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
      listVehicule: [],
      offers: "",
      price :'',
      info:''
    };
  },
  methods: {
    
    getListOffer: function() {
      axios({
        url: "http://localhost:3000/api/v1/offer",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(response => (this.offers = response.data.result));
    },
    setLocation: function() {
      const convertDatepicker1 = this.startDate.toISOString();
      const datePickerLessT1 = convertDatepicker1.replace("T", " ");
      const finalDate1 = datePickerLessT1.replace("Z", "");

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
            finalPrice: this.price,
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
              idOffers: this.idOffers,
              titleOffers: this.titleOffers
            });
          }
        })
        .catch(error => console.log(error));
    },
    getVehicule: function() {
      this.getPriceoffer()
      this.listVehicule = [];
      axios
        .get(
          "http://localhost:3000/api/v1/vehicle/available/" +
            this.offers_idoffers
        )
        .then(response => {
          for (let i in response.data.result) {
            this.idVehicles = response.data.result[i].idvehicle;
            this.brand = response.data.result[i].brand;
            this.model = response.data.result[i].model;
            this.listVehicule.push({
              idVehicles: this.idVehicles,
              titleVehicles: this.brand + " - " + this.model
            });
          }
        })
        .catch(error => console.log(error));
    },
    getPriceoffer: function() {
      axios({
        url: "http://localhost:3000/api/v1/offer/"+this.offers_idoffers,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => {
        if(this.listVehicule.length>0) {
        this.price = response.data.result[0].price
        }
        console.log(response);
      });
    },
    getInfoUser: function() {
      axios({
        url: "http://localhost:3000/api/v1/admin/user",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => {
        this.info = response.data.result[0]
        console.log(response);
      });
    }
  },
  mounted() {
    this.getOffer();
    this.getListOffer();
    this.getInfoUser();
  }
};
</script>
<style>
.layout {
  display:flex;
  justify-content:center;
  flex-direction:row
}
.info {
  color: #9A9A9A;
  font-size: large;
}
.section {
  padding: 0px 0 !important;
}
</style>
