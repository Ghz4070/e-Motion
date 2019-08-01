<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="photo-container"></div>
        <h3 class="title">Admin</h3>
        <p>Mise à jour informations de l'offre :</p>
        <p class="category">{{ title }}</p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Gerer les offres</h3>
        <hr />
        <div>
          <fg-input placeholder="Titre" v-model="title"></fg-input>
          <fg-input placeholder="Prix" v-model="price"></fg-input>
          <fg-input placeholder="Description" v-model="description"></fg-input>
          <fg-input placeholder="Pénalité" v-model="penality"></fg-input>
          <fg-input placeholder="Nombre de km" v-model="nbKm"></fg-input>
          <fg-input placeholder="Point de fidélité offert" v-model="pointFidelityOffers"></fg-input>
          <fg-input placeholder="Visibilité" v-model="hiddenOffers"></fg-input>
          <fg-input placeholder="Créée par" v-model="createdBy"></fg-input>
        </div>
        <div class="text-center">
          <n-button v-on:click="UpdateInfo" >Sauvegarder</n-button>
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
  name: "OfferUpdate",
  props: {},
  components: {
    [Button.name]: Button,
    FgInput,
    Modal
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
      createdBy: "",
      modals: {
        classic: false
      }
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
      let idOffer = this.$route.params.id;
      axios({
        url: "http://localhost:3000/api/v1/offer/" + idOffer,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(
        response => (
          (this.title = response.data.result[0].title),
          (this.price = response.data.result[0].price),
          (this.description = response.data.result[0].description),
          (this.penality = response.data.result[0].penality),
          (this.nbKm = response.data.result[0].nbKm),
          (this.pointFidelityOffers =
            response.data.result[0].pointFidelityOffers),
          (this.hiddenOffers = response.data.result[0].hiddenOffers),
          (this.createdBy = response.data.result[0].createdBy)
        )
      );
    },
    UpdateInfo: function() {
    let idOffer = this.$route.params.id;
      axios
        .patch(
          "http://localhost:3000/api/v1/admin/offer/" + idOffer,
          {
            title: this.title,
            price: this.price,
            description: this.description,
            penality: this.penality,
            nbKm: this.nbKm,
            pointFidelityOffers: this.pointFidelityOffers,
            hiddenOffers: this.hiddenOffers,
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
            this.account =
              "Votre compte a été créé, vous allez être redirectionné dans moins de 5 secondes";
            this.hideOrNot = "donthide";
            this.$router.push('/admin/offers');
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
