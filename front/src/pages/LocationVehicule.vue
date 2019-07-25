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
                  <th> Action </th>
                </tr>
                <tr v-for="vehiculeInfo in vehicule" v-bind:key="vehiculeInfo.id">
                  <td> {{vehiculeInfo.brand}} </td>
                  <td> {{vehiculeInfo.model}} </td>
                  <td> {{vehiculeInfo.color}} </td>
                  <td> {{vehiculeInfo.price}} </td>
                  <td> <button @click="bookACar">Add</button> </td>
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
  name: 'locationVehicule',
  bodyClass: 'index-page',
    methods: {
      bookACar(){
        this.citizens.push({"firstname":"Lisa", "lastname":"Simpson", "age":"10"})
        axios
      .patch('http://localhost:3000/api/v1/vehicles/edit/'+ idVehicule) 
      .then(response => { this.vehicule = response.data.result })
      .catch(error => console.log(error))
      }
    },
  created(){
      let idVehicule = this.$route.params.id;
      axios
      .get('http://localhost:3000/api/v1/vehicle/'+ idVehicule) 
      .then(response => { this.vehicule = response.data.result })
      .catch(error => console.log(error))
  },
  data () {
    return {
        vehicule: []
    }
  }
};
</script>
<style></style>
