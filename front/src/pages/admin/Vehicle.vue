<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <h3 class="title">Admin</h3>
        <h1 class="title">Gérer les véhicules</h1>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Liste des véhicules</h3>
        <router-link to='/admin/createvehicle' class="text-right"> 
        <n-button type="default">
     Ajouter un nouveau véhicule
          </n-button>
        </router-link>
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
                <drop-down class="btn-group">
                  <template slot="title">
                    <button type="button" class="btn btn-default">
                      <i class="now-ui-icons ui-1_settings-gear-63"></i>
                    </button>
                  </template>
                  <router-link
                    class="stl"
                    :to="{path: '/admin/vehicle/update/'+(vehicle.idvehicle) }"
                  >
                    <a class="dropdown-item" href="#">
                      <b>
                        <i class="now-ui-icons ui-2_settings-90"></i> Modifier
                      </b>
                    </a>
                  </router-link>
                  <!-- <router-link
                    class="stl"
                    :to="{path: '/admin/vehicles' }"
                    @click.native="removeVehicle(vehicle.idvehicle)"
                  >
                    <a class="dropdown-item">
                      <b>
                        <i
                          v-on:click="removeVehicle(vehicle.idvehicle)"
                          class="now-ui-icons ui-1_simple-remove"
                        ></i> Supprimer
                      </b>
                    </a>
                  </router-link> -->
                </drop-down>
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
  DropDown,
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
    FgInput,
    DropDown
  },
  data() {
    return {
      vehicles: "",
      idvehicle:""
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
    },
    removeVehicle: function(idvehicle) {
      axios({
        url: "http://localhost:3000/api/v1/admin/vehicle/delete/" + idvehicle,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => console.log(response));
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