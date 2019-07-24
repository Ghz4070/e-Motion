<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt="" />
          <h1 class="h1-seo"> Page Véhicule </h1>
          <h3>Liste des Véhicules</h3>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <table>
                <tr>
                  <th> Brand </th>
                  <th> Model </th>
                  <th> Color </th>
                  <th> Price </th>
                </tr>
                <tr v-for="vehicule in vehicules" v-bind:key="vehicule.id">
                  <td>{{vehicule.brand}}</td>
                  <td>{{vehicule.model}}</td>
                  <td>{{vehicule.color}}</td>
                  <td>{{vehicule.price}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'vehicule',
  bodyClass: 'index-page',
  created(){
      axios
      .get('http://localhost:3000/api/v1/vehicle/all') 
      .then(response => { this.vehicules = response.data.result })
      .catch(error => console.log(error))
  },
  data () {
    return {
        vehicules: []
    }
  }
};
</script>
<style></style>
