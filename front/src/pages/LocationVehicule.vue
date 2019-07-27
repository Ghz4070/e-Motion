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

               localStorage.setItem('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IntcInJvbGVcIjpbXCJST0xFX0FETUlOXCIsXCJST0xFX1BST1BSSU9cIixcIlJPTEVfVVNFUlwiXX0iLCJpYXQiOjE1NjQyMzUzNTAsImV4cCI6MTU2NDMyMTc1MH0.jamDDvEELSPaqi2cLat4_JCP72bQtcgb6zhxfPsS9G4')

        let token = localStorage.getItem('x-access-token')//Mettre des verification et de la sécurité localstorage est accesible avec des injections ou par la console du navigateur 
        if(token == null || token == undefined ){
          console.log('Vous devez vous connecter pour éxécuter cette action') // Peux etre mettre un message d'alerte

          let routeRedirection = this.$router; 
          routeRedirection.push('/login') // Possibilité de mettre un setTimeOUt le temps d'informer l'utiilisateur
        }

        let idVehicule = this.$route.params.id;
        let startDate = "2019-07-27 15:08:49";
        let endDate = "2019-07-29 15:08:49";
        let pointFidelityUsed = 0;
        let status = "Terminer";
        let idoffers = 1;
        let cancelLocation = 0;
        let returnVehicule = 0;
        
       localStorage.setItem('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IntcInJvbGVcIjpbXCJST0xFX0FETUlOXCIsXCJST0xFX1BST1BSSU9cIixcIlJPTEVfVVNFUlwiXX0iLCJpYXQiOjE1NjQyMzUzNTAsImV4cCI6MTU2NDMyMTc1MH0.jamDDvEELSPaqi2cLat4_JCP72bQtcgb6zhxfPsS9G4')
        axios({
              url: 'http://localhost:3000/api/v1/location/add',
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': localStorage.getItem('x-access-token')
              },
              data: {
                  startDate: startDate,
                  endDate: endDate,
                  pointFidelityUsed: pointFidelityUsed,
                  status: status,
                  cancelLocation:cancelLocation,
                  returnVehicule : returnVehicule,
                  idoffers: idoffers,
                  
              }
          })
          .then((response) => {
                console.log(response)
            })
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
