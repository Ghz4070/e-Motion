
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
      <div class="container">
        <h3 class="title">Historique d'achat</h3>
        <hr />
        <div>
          <table id="customers">
            <tr>
              <th>NUM. LOCATION</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Voiture</th>
              <th>Modèle</th>
              <th>Point utiliser</th>
              <th>Status</th>
              <th>Annulation</th>
            </tr>
            <tr v-for="location in locations" :key="location.startDate">
              <td>{{ location.idlocation }}</td>
              <!-- <td>{{location.startDate}}</td> -->
              <td>{{ new Intl.DateTimeFormat('en-GB').format(new Date(location.startDate)) }}</td>
              <td>{{ new Intl.DateTimeFormat('en-GB').format(new Date(location.endDate)) }}</td>
              <td>{{ location.brand }}</td>
              <td>{{ location.model }}</td>
              <td class="text-center" v-if="!location.pointFidelityUsed">0</td>
              <td v-else>{{ location.pointFidelityUsed }}</td>
              <td>{{ location.status }}</td>
              <td
               class="text-center"
                v-if="(new Date(location.startDate) > currentDate) && location.status != 'Annuler'"
              >
                <n-button
                  type="danger"
                  size="sm"
                  v-on:click="setStatus(location.idlocation)"
                >Annuler</n-button>
              </td>
              <td v-else></td>
            </tr>
          </table>
        </div>
        <div class="text-center"></div>
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
      currentDate: new Date(),
      locations: "",
      firstname: "",
      lastname: "",
      theid: ""
    };
  },
  mounted() {
    this.requestInfo();
  },
  updated() {
    /* this.requestInfo() */
  },
  methods: {
    requestInfo: function() {
      axios({
        url: "http://localhost:3000/api/v1/user/historic",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => (this.locations = response.data.result));
    },
    setStatus: function(theid) {
      axios({
        url: "http://localhost:3000/api/v1/location/cancel",
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        },
        data: {
          id: theid
        }
      }).then(response => {
        console.log(response);
      });
      this.requestInfo();
    }
  }
};
</script>
<style>
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
  background-color: slategray;
  color: white;
}
.text-center {
  margin-bottom: 150px;
}
</style>
