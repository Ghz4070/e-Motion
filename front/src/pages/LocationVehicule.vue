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
                  <td> <button @click="addLocation">Add</button> </td>
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
      addLocation(){

        //localStorage.setItem('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IntcInJvbGVcIjpbXCJST0xFX0FETUlOXCIsXCJST0xFX1BST1BSSU9cIixcIlJPTEVfVVNFUlwiXX0iLCJpYXQiOjE1NjQzMjM3MTEsImV4cCI6MTU2NDQxMDExMX0.jV8C0bTuZSYp-yQU7hP4LiN-2ZrAI6WGOam9ky7YvVE')
        let token = localStorage.getItem('x-access-token')//Mettre des verification et de la sécurité localstorage est accesible avec des injections ou par la console du navigateur 
        if(token == null || token == undefined ){
          console.log('Vous devez vous connecter pour éxécuter cette action') // Peux etre mettre un message d'alerte

          let routeRedirection = this.$router; 
          routeRedirection.push('/login') // Possibilité de mettre un setTimeOUt le temps d'informer l'utiilisateur
        }
        
        /* let idVehicule = this.$route.params.id;
        let startDate = "2019-07-27 15:08:49";
        let endDate = "2019-07-29 15:08:49";
        let pointFidelityUsed = 0;
        let status = "Terminer";
        let idoffers = 1;
        let cancelLocation = 0;
        let returnVehicule = 0; */


        var tokenB = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IntcInJvbGVcIjpbXCJST0xFX0FETUlOXCIsXCJST0xFX1BST1BSSU9cIixcIlJPTEVfVVNFUlwiXX0iLCJpYXQiOjE1NjQzMTY5MjksImV4cCI6MTU2NDQwMzMyOX0.JWngHJb-kadrtO24Tg2qX93RKsZU9qe2z0boW1i4dcw"
        axios({
                    url: 'http://localhost:3000/api/v1/admin/location/addOne',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('x-access-token')
                    },
                    data: {
                        
                    }
                })
        .then(response => { console.log(response) })
        .catch(error => console.log(error))
      },
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
