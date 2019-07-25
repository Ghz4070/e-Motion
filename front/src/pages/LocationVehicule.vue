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
        //Vérifier que l'utilisateur est bien connecté

        axios
            .put('http://localhost:3000/api/v1/vehicles/bookACar/'+ idVehicule)
            .then(response => { this.vehicule = response.data.result }) // gestion du retour faire une vue different ou changer le composant 
            .catch(error => console.log(error))
      }
    },
  created(){
      // Mettre beforeCreated, si le vehicule demandé n'est pas dispo gérer l'affichage en fonction.
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
