<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <img class="warning" :src="image"/>
        <h3 class="title"> Attention</h3>
        <p>Pour accéder à cette page vous devez être connecter.</p>
        <p>Votre session de connexion a peut-être expiré vous êtes invité à vous connecter via le lien ci-dessous</p>
          <router-link class="nav-link" to="/login">
                   <div class=" text-center">
                <n-button type="neutral" round size="sm" >Se connecter</n-button>
              </div>
                </router-link>
        <p class="category"></p>
      </div>
    </div>
    <div class="container">
      <h2 class="title text-center"><img class="warning" :src="car"/>Location Car Concept™
      </h2>
      
    </div>
  </div>
</template>

<script>
import { Button, FormGroupInput } from "@/components";

export default {
  name: "dontLogin",
  props: {},
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      image: require("@/assets/static/images/warning.png"),
      car: require("@/assets/static/images/car.png")
    };
  },
  mounted() {
  },
  updated() {
  },
};
</script>

<style scoped>
.warning {
  width:15%;
   margin-top:25px;
}
</style>
