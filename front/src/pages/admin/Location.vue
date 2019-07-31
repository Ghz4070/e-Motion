<template>
<div>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <h3 class="title">Admin</h3>
            <p>Gérer les locations</p>
            <ul>
                
            </ul>
        </div>
    </div>
<div class="section">
      <div class="container" >
        <h3 class="title">Liste des locations</h3>
        <hr />
          <div>
            <div>
            <fg-input
              type="text"
              id="myInput"
              v-on:keyup="myFunction"
              placeholder="Rechercher par date.."
            ></fg-input>
          </div>
      <table id="customers">
        <tr>
          <th>NUM. Location</th>
          <th>Période</th>
          <th>Status</th>
          <th>Prix final</th>
          <th>Offre</th>
          <th>Utilisateur</th>
          <th>Voiture</th>
          <th>Action</th>
        </tr>
        <tr v-for="location in locations" :key="location.idlocation">
          <td>{{ location.idlocation }}</td>
          <td>{{ new Intl.DateTimeFormat('en-GB').format(new Date(location.startDate)) }} - 
              {{ new Intl.DateTimeFormat('en-GB').format(new Date(location.endDate)) }}
          </td>
          <td>{{ location.status }}</td>
          <td>{{ location.finalPrice }}</td>
          <td>{{ location.title }}</td>
          <td>{{ location.firstname }} {{ location.lastname }}</td>
          <td>{{ location.brand }} {{ location.model }}</td>
          <td><n-button type="info" size="sm" v-on:click="setStatus(location.idlocation)">Modifier</n-button></td>
        </tr>
      </table>
    </div>
         <div class="text-center">
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane, Button, Modal, FormGroupInput as FgInput } from "@/components";
import axios from "axios";

export default {
  name: 'LocationAdmin',
  props: {
  },
  components: {
    Tabs,
    TabPane,
    [Button.name]: Button,
    Modal,
    FgInput
  },
  data() {
    return {
      locations: ""
    };
  },
  mounted() {
      this.requestInfo()
  },
  methods: {
    requestInfo: function() {
      axios({
      url: "http://localhost:3000/api/v1/admin/location/all",
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x-access-token")
      }
    }).then(
      response => (
        this.locations = response.data.result
      )
    );
    },
    myFunction: function() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("customers");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
    }
}
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
</style>