
<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="photo-container">
          <img src="https://cdn3.iconfinder.com/data/icons/glyphicon/64/profil-512.png" alt />
        </div>
        <h3 class="title">{{ lastname }} {{ firstname }}</h3>
        <p></p>
        <p class="category"></p>
      </div>
    </div>
    <div class="section">
      <div class="container" >
        <h3 class="title">Historique d'achat</h3>
        <hr />
          <div>
      <table id="customers">
        <tr>
          <th>ID LOCATION</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Voiture</th>
          <th>Modèle</th>
          <th>Point utiliser</th>
          <th>Status</th>
          <th>Annulation</th>
        </tr>
        <tr v-for="location in locations" :key="location.startDate">
          <td>{{location.idlocation}}</td>
          <td>{{location.startDate}}</td>
          <td>{{location.endDate}}</td>
          <td>{{location.brand}}</td>
          <td>{{location.model}}</td>
          <td>{{location.pointFidelityUsed}}</td>
          <td>{{location.status}}</td>
          <td><n-button type="danger" size="sm">Annulation</n-button></td>
        </tr>
      </table>
    </div>
         <div class="text-center">
          <!-- <div>
            <n-button type="primary" @click.native="modals.classic = true">Modifier mes informations</n-button>
            <modal :show.sync="modals.classic" headerClasses="justify-content-center">
              <h4 slot="header" class="title title-up">Modifier mes informations</h4>
              <UpdateProfile />
            </modal>
          </div> -->
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane, Button, Modal } from "@/components";
import axios from "axios";
import Vue from "vue";
import UpdateProfile from "./components/FormUpdateProfile.vue";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    Tabs,
    TabPane,
    [Button.name]: Button,
    Modal,
    UpdateProfile
  },
  filters: {
    // Filter definitions
    Upper(value) {
      return value.toUpperCase();
    }
  },
  data() {
    return {
        locations:"",
      firstname: "",
      lastname: "",
      birthday: "",
      address: "",
      phoneNumber: "",
      driverLicence: "",
      email: "",
      roles: "",
      username: "",
      pointFidelity: "",
      modals: {
        classic: false
      }
    };
  },
  mounted() {
    axios({
      url: "http://localhost:3000/api/v1/user/historic",
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x-access-token")
      }
    }).then(
      response => (
        this.locations = response.data.result
        /* (this.firstname = response.data.result[0].firstname),
        (this.lastname = response.data.result[0].lastname),
        (this.birthday = response.data.result[0].birthday),
        (this.address = response.data.result[0].address),
        (this.phoneNumber = response.data.result[0].phoneNumber),
        (this.driverLicence = response.data.result[0].driverLicence),
        (this.email = response.data.result[0].email),
        (this.roles = response.data.result[0].roles),
        (this.username = response.data.result[0].username),
        (this.pointFidelity = response.data.result[0].pointFidelity) */
      )
    );
  }
};
</script>
<style>
/* th {
        padding: 5px;
        text-align: left;
    }

    table {
        width: 100%;
    } */
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
