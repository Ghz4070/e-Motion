<template>
<div v-if="offers">
<tabs type="primary" tabContentClasses="tab-subcategories"
        square centered class="row">
    <tab-pane v-for="offer in offers" :key="offer.ifoffers">
    <span slot="label">
      <i class="now-ui-icons objects_umbrella-13"></i>{{ offer.title }}
    </span>
      <card style="width: 50rem;" class="card-nav-tabs text-center" header-classes="card-header-warning">
   <div slot="header" class="mt-2">
     Offre - {{ offer.idoffers }}
   </div>
   <h4 class="card-title">{{ offer.title }}</h4>
   <p class="card-text">{{ offer.description }}</p>
   <card style="width: 20rem;">
   <ul slot="raw-content" class="list-group list-group-flush">
     <li class="list-group-item">Nombre de km : {{ offer.nbKm }} km</li>
     <li class="list-group-item">Récompense : {{ offer.pointFidelityOffers }} point offert</li>
     <li class="list-group-item">Jour en pus : {{ offer.penality }}€/jours</li>
     <li class="list-group-item">Prix : {{ offer.price }}€</li>
   </ul>
  </card>
  </card>
    </tab-pane>
  </tabs>
</div>
<div v-else>
  <p>Aucune offre de disponnible pour le moment.</p>
  <p>Ne craignez rien, nous vous concoctons de très bonne surprises.🎁 🎁 🎁</p>
</div>
</template>
  

<script>
import { Tabs, TabPane, Card } from "@/components";
import axios from "axios";
import Vue from "vue";

export default {
  name: 'offers',
  components: {
    Tabs,
    TabPane,
    Card
  },
  data() {
      return {
          offers:''
      }
  },
  mounted() {
    axios({
      url: "http://localhost:3000/api/v1/offer",
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(
      response => (
        this.offers = response.data.result
      )
    );
  }
};
</script>
<style></style>
