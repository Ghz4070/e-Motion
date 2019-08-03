<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt />
          <h1 class="h1-seo">Page Véhicule</h1>
          <h3>Liste des Véhicules</h3>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <tabs
                type="primary"
                tabContentClasses="tab-subcategories"
                square
                centered
                class="row"
              >
                <tab-pane>
                  <span slot="label">
                    <i class="now-ui-icons objects_support-17"></i>Tout les véhicules
                  </span>
                  <card
                    v-for="vehicule in vehicules"
                    :key="vehicule.idvehicle"
                    class="mr-5"
                    style="width: 20rem;"
                  >
                    <img slot="image" class="card-img-top" :src="imgSrc" alt="Card image cap" />
                    <div>
                      <h3 class="card-title">{{vehicule.brand}} - {{vehicule.model}}</h3>
                      <p class="card-text">
                        <ul>
                            <li>Couleur : {{ vehicule.color }}</li>
                            <li>Année : {{ new Date(vehicule.datePurchase ).getFullYear() }}</li>
                            <li>Nb. km : {{ vehicule.nbKm }}</li>
                            <li>Prix neuve : {{ vehicule.price }} €</li>
                        </ul>
                      </p>
                      <n-button type="primary">Go somewhere</n-button>
                    </div>
                  </card>
                </tab-pane>
                <tab-pane>
                  <span slot="label">
                    <i style="color:green" class="now-ui-icons objects_support-17"></i> Véhicule disponible
                  </span>
                  <card
                    v-for="vehicule in available"
                    :key="vehicule.idvehicle"
                    class="mr-5"
                    style="width: 20rem;"
                  >
                    <img slot="image" class="card-img-top" :src="imgSrc" alt="Card image cap" />
                    <div>
                      <h3 class="card-title">{{vehicule.brand}} - {{vehicule.model}}</h3>
                      <p class="card-text">
                        <ul>
                            <li>Couleur : {{ vehicule.color }}</li>
                            <li>Année : {{ new Date(vehicule.datePurchase ).getFullYear() }}</li>
                            <li>Nb. km : {{ vehicule.nbKm }}</li>
                            <li>Prix neuve : {{ vehicule.price }} €</li>
                        </ul>
                      </p>
                      <n-button type="primary">Go somewhere</n-button>
                    </div>
                  </card>
                </tab-pane>
                <tab-pane>
                  <span slot="label">
                    <i style="color:red" class="now-ui-icons objects_support-17"></i >Véhicule indisponible
                  </span>
                  <card
                    v-for="vehicule in notAvailable"
                    :key="vehicule.idvehicle"
                    class="mr-5"
                    style="width: 20rem;"
                  >
                    <img slot="image" class="card-img-top" :src="imgSrc" alt="Card image cap" />
                    <div>
                      <h3 class="card-title">{{vehicule.brand}} - {{vehicule.model}}</h3>
                      <p class="card-text">
                        <ul>
                            <li>Couleur : {{ vehicule.color }}</li>
                            <li>Année : {{ new Date(vehicule.datePurchase ).getFullYear() }}</li>
                            <li>Nb. km : {{ vehicule.nbKm }}</li>
                            <li>Prix neuve : {{ vehicule.price }} €</li>
                        </ul>
                      </p>
                      <n-button type="primary">Go somewhere</n-button>
                    </div>
                  </card>
                </tab-pane>
              </tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, Tabs, TabPane } from "@/components";
import axios from "axios";

export default {
  name: "vehicule",
  bodyClass: "index-page",
  components: {
    Card,
    Tabs,
    TabPane,
    [Button.name]: Button
  },
  created() {
    axios
      .get("http://localhost:3000/api/v1/vehicle/all") //all pour tous
      .then(response => {
        this.vehicules = response.data.result;
      })
      .catch(error => console.log(error));

      axios
      .get("http://localhost:3000/api/v1/vehicle/available") //all pour tous
      .then(response => {
        this.available = response.data.result;
      })
      .catch(error => console.log(error));

      axios
      .get("http://localhost:3000/api/v1/vehicle/notavailable") //all pour tous
      .then(response => {
        this.notAvailable = response.data.result;
      })
      .catch(error => console.log(error));
  },
  data() {
    return {
      vehicules: '',
      available: '',
      notAvailable: '',
      imgSrc:
        "https://www.numerama.com/content/uploads/2015/10/google-nouveau-logo-hd.jpg"
    };
  }
};
</script>
<style></style>
