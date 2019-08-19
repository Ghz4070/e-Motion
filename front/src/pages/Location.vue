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
        <tabs
          type="primary"
          tabContentClasses="tab-subcategories"
          square
          centered
          class="row layout"
        >
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
          <alert
            type="info"
          >{{ info.username }}, Vous disposez de {{ info.pointFidelity }} points de fidélité à utiliser dès aujourd'hui.</alert>
        </div>
      </div>
    </div>
    <div class="section section-contact-us text-center">
      <div></div>
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
            <br />
            <label>Point de fidélité à utiliser</label>
            <v-select @input="getPriceoffer()" v-model="pointFidelityUsed" :options="pointTab"></v-select>
            <br />
            <label>Choix de l'offre</label>
            <v-select
              @input="getVehicule()"
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
            <div v-if="amount && listVehicule.length>0">
              Le prix final est de :
              <b>{{ price }}</b> €.
            </div>
            <br />
            <div v-on:click="cancel" v-if="alert==true" class="alert">
              <alert type="danger" dismissible>
                <div class="alert-icon">
                  <i class="now-ui-icons travel_info"></i>
                </div>
                <strong>Attention!</strong> Vous avez oublier de compléter un champs.
              </alert>
            </div>
            <div v-on:click="cancel" v-if="dateAlert==true" class="alert">
              <alert type="danger" dismissible>
                <div class="alert-icon">
                  <i class="now-ui-icons travel_info"></i>
                </div>
                <strong>Attention!</strong> Vérifier les dates choisis ne sont sont pas compatible. La date de début ne peut être supérieur à la date de fin.
              </alert>
            </div>
            <div v-if="locationSuccess==true" class="alert">
              <alert type="success" dismissible>
                <div class="alert-icon">
                  <i class="now-ui-icons travel_info"></i>
                </div>
                <strong>Location réaliser avec succès!</strong> Votre demande de location à bien été pris en compte.
              </alert>
            </div>
            <div class="send-button">
              <!-- <vue-stripe-checkout
                  ref="checkoutRef"
                  :amount="amount"
                  :name="name"
                  @done="done"
                  @opened="opened"
                  @closed="closed"
                  @canceled="canceled"
              ></vue-stripe-checkout>-->
              <vue-stripe-checkout
                ref="checkoutRef"
                @done="done"
                :amount="amount"
                currency="EUR"
                name="Finalisation de la location"
              ></vue-stripe-checkout>              
              <n-button
                @click="checkout"
                type="primary"
                round
                block
                size="lg"
              >Procéder au paiement</n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Button,
  FormGroupInput,
  Tabs,
  TabPane,
  Card,
  Alert,
  Modal
} from "@/components";
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
    [Modal.name]: Modal,
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
      price: "",
      info: "",
      pointTab: [],
      alert: false,
      locationSuccess: false,
      dateAlert: false,
      modals: {
        classic: false
      },
      name: "Paiement",
      amount: null,
      currency: "EUR"
    };
  },
  methods: {
    done ({token, args}) {
      this.setLocation();
    },
    cancel: function() {
      (this.alert = false),
        (this.locationSuccess = false),
        (this.dateAlert = false);
    },
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
      if (
        this.startDate &&
        this.endDate &&
        this.offers_idoffers &&
        this.vehicle_idvehicle
      ) {
        if (this.startDate.getTime() < this.endDate.getTime()) {
          const convertDatepicker1 = this.startDate.toISOString();
          const datePickerLessT1 = convertDatepicker1.replace("T", " ");
          const finalDate1 = datePickerLessT1.replace("Z", "");

          const convertDatepicker2 = this.endDate.toISOString();
          const datePickerLessT2 = convertDatepicker2.replace("T", " ");
          const finalDate2 = datePickerLessT2.replace("Z", "");

          axios
            .post(
              "http://localhost:3000/api/v1/admin/location/add?pointFidelity=" +
                this.pointFidelityUsed +
                "&price=" +
                this.price,
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
              this.locationSuccess = true;
              if (result.data.status == "success") {
                setTimeout(() => {
                  this.$router.push("/");
                }, 5000);
              }
            })
            .catch(err => console.log(err));
        } else {
          this.dateAlert = true;
        }
      } else {
        this.alert = true;
      }
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
      this.getPriceoffer();
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
        url: "http://localhost:3000/api/v1/offer/" + this.offers_idoffers,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => {
        if (this.listVehicule.length > 0) {
          this.price = response.data.result[0].price;
          this.updatePrice();
          this.amount = this.price * 100;
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
        this.info = response.data.result[0];
        this.setPoint();
      });
    },
    setPoint: function() {
      for (var i = 0; i < this.info.pointFidelity; i += 100) {
        this.pointTab.push(i);
      }
    },
    checkout: async function() {
      const { token, args } = await this.$refs.checkoutRef.open();
      console.log({ token, args });
    },
    updatePrice: function() {
      if (this.price && this.pointFidelityUsed) {
        if (this.pointFidelityUsed >= 100 && this.pointFidelityUsed <= 199) {
          this.price = this.price - this.price * 0.05;
        } else if (
          this.pointFidelityUsed >= 200 &&
          this.pointFidelityUsed <= 299
        ) {
          this.price = this.price - this.price * 0.1;
        } else if (
          this.pointFidelityUsed >= 300 &&
          this.pointFidelityUsed <= 399
        ) {
          this.price = this.price - this.price * 0.15;
        } else if (
          this.pointFidelityUsed >= 400 &&
          this.pointFidelityUsed <= 499
        ) {
          this.price = this.price - this.price * 0.2;
        } else if (
          this.pointFidelityUsed >= 500 &&
          this.pointFidelityUsed <= 599
        ) {
          this.price = this.price - this.price * 0.25;
        } else if (this.pointFidelityUsed > 600) {
          this.price = this.price - this.price * 0.3;
        } else if (this.pointFidelityUsed < 100) {
          this.price = this.price;
        } else {
          this.price = this.price;
        }
      }
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
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.info {
  color: #9a9a9a;
  font-size: large;
}
.section {
  padding: 0px 0 !important;
}
</style>
