<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <h3 class="title">Admin</h3>
        <p>Gérer les véhicules</p>
        <ul></ul>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Liste des véhicules</h3>
        <hr />
        <div>
          <div>
            <fg-input
              type="text"
              id="myInput"
              v-on:keyup="myFunction"
              placeholder="Rechercher par modèle ou marque.."
            ></fg-input>
          </div>
          <table id="customers">
            <tr>
              <th>NUM. Vehicule</th>
              <th>Type</th>
              <th>Modèle</th>
              <th>Numéro de série</th>
              <th>Couleur</th>
              <th>Plaque</th>
              <th>Nombre km.</th>
              <th>Date d'achat</th>
              <th>Prix</th>
              <th>Dispo.</th>
              <th>Créée par</th>
              <th>Action</th>
            </tr>
            <tr v-for="vehicle in vehicles" :key="vehicle.idvehicle">
              <td>{{ vehicle.idvehicle }}</td>
              <td>{{ vehicle.typeVehicle }}</td>
              <td>{{ vehicle.brand }} - {{ vehicle.model }}</td>
              <td>{{ vehicle.serialNumber }}</td>
              <td>{{ vehicle.color }}</td>
              <td>{{ vehicle.licensePlate }}</td>
              <td>{{ vehicle.nbKm }}</td>
              <td>{{ new Intl.DateTimeFormat('en-GB').format(new Date(vehicle.datePurchase)) }}</td>
              <td>{{ vehicle.price }}</td>
              <td>{{ vehicle.available }}</td>
              <td>{{ vehicle.createdBy }}</td>
              <td>
                <n-button type="info" size="sm" v-on:click="setStatus(location.idlocation)">Modifier</n-button>
              </td>
            </tr>
          </table>
        </div>
        <div class="text-center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Tabs,
  TabPane,
  Button,
  Modal,
  FormGroupInput as FgInput
} from "@/components";
import axios from "axios";

export default {
  name: "VehicleAdmin",
  props: {},
  components: {
    Tabs,
    TabPane,
    [Button.name]: Button,
    Modal,
    FgInput
  },
  data() {
    return {
      vehicles: ""
    };
  },
  mounted() {
    this.requestInfo();
  },
  methods: {
    requestInfo: function() {
      axios({
        url: "http://localhost:3000/api/v1/vehicle/all",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => (this.vehicles = response.data.result));
    },
    myFunction: function() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("customers");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
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
</style>