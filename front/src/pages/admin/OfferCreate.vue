<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="photo-container"></div>
        <h3 class="title"></h3>
        <p>Création d'une nouvelle offre :</p>
        <p class="category">{{ title }}</p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Formulaire d'ajout d'une nouvelle offre</h3>
        <hr />
        <div>
          <fg-input placeholder="Titre" v-model="title"></fg-input>
          <fg-input placeholder="Prix" v-model="price"></fg-input>
          <fg-input placeholder="Description" v-model="description"></fg-input>
          <fg-input placeholder="Pénalité" v-model="penality"></fg-input>
          <fg-input placeholder="Nombre de km" v-model="nbKm"></fg-input>
          <fg-input placeholder="Point de fidélité offert" v-model="pointFidelityOffers"></fg-input>
          <label>Rendre visible ?</label>
                <v-select :options="yesOrNo" v-model="hiddenOffers" label="available"></v-select>
        </div><br />
        <div class="text-center">
          <div v-on:click="cancel" v-if="alert==true" class="alert">
              <alert type="danger" dismissible>
                <div class="alert-icon">
                  <i class="now-ui-icons travel_info"></i>
                </div>
                <strong>Attention!</strong> Vous avez oublier de compléter un champs.
              </alert>
            </div>
          <n-button v-on:click="setOffer" >Sauvegarder</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, FormGroupInput as FgInput, Alert } from "@/components";
import axios from "axios";
import { DatePicker } from "element-ui";
import { setTimeout } from "timers";
import vSelect from 'vue-select';


export default {
  name: "OfferCreate",
  props: {},
  components: {
    [Button.name]: Button,
    FgInput,
    vSelect,
    Alert
  },
  data() {
    return {
      title: "",
      price: "",
      description: "",
      penality: "",
      nbKm: "",
      pointFidelityOffers: "",
      hiddenOffers: "",
      yesOrNo: ['Oui', 'Non'],
      alert: false,
    };
  },
  methods: {
    cancel: function() {
      this.alert = false
    },
    setOffer: function() {
      if(this.title && this.price && this.description && this.penality && this.nbKm && this.pointFidelityOffers && this.hiddenOffers ) {
    let idOffer = this.$route.params.id;
      axios
        .post(
          "http://localhost:3000/api/v1/admin/offer/",
          {
            title: this.title,
            price: this.price,
            description: this.description,
            penality: this.penality,
            nbKm: this.nbKm,
            pointFidelityOffers: this.pointFidelityOffers,
            hiddenOffers: this.hiddenOffers = this.available == "Oui" ? 1 : 0,
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
            this.$router.push('/admin/offers');
          }
        })
        .catch(err => console.log(err));
    } else{
      this.alert = true;
    }
    }
  }
};
</script>

<style scoped></style>
