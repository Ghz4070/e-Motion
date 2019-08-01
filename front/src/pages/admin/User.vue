<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <h3 class="title">Admin</h3>
        <h1 class="title">Gérer les utilisateurs</h1>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Liste des utilisateurs</h3>
        <hr />
        <div>
          <div>
            <fg-input
              type="text"
              id="myInput"
              v-on:keyup="myFunction"
              placeholder="Rechercher par nom ou prénom.."
            ></fg-input>
          </div>
          <table id="customers">
            <tr>
              <th>NUM. User</th>
              <th>Utilisateur</th>
              <th>Adresse</th>
              <th>Portable</th>
              <th>Num. Permis</th>
              <th>Date de naissance</th>
              <th>Email</th>
              <th>Point fidélité</th>
              <th>Role</th>
              <th>Modifier</th>
            </tr>
            <tr v-for="user in users" :key="user.idusers">
              <td>{{ user.idusers }}</td>
              <td>{{ user.firstname }} - {{ user.lastname }}</td>
              <td>{{ user.address }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.driverLicence }}</td>
              <td> {{ new Intl.DateTimeFormat('en-GB').format(new Date(user.birthday)) }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.pointFidelity }}</td>
              <td>{{ (user.roles).replace('{"role":[','').replace(']}','') }}</td>
              <td>
                <router-link :to="{path: '/admin/user/update/'+(user.idusers) }">
                <n-button type="info" size="sm" >Modifier</n-button>
                </router-link>
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
  name: "UserAdmin",
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
      users: ""
    };
  },
  mounted() {
    this.requestInfo();
  },
  methods: {
    requestInfo: function() {
      axios({
        url: "http://localhost:3000/api/v1/admin/user/all",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => (this.users = response.data.result));
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