<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('img/bg5.jpg')"></parallax>
      <div class="container">
        <div class="photo-container">
          <img src="https://cdn3.iconfinder.com/data/icons/glyphicon/64/profil-512.png" alt />
        </div>
        <h3 class="title">{{ lastname }} {{ firstname }}</h3>
        <p></p>
        <p class="category">
          Numéro de permis : {{ driverLicence }}
          <br />
          Point de fidélité : {{ pointFidelity }}
        </p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Information du profil</h3>
        <hr />
        <h5 class="description">
          <table>
            <tbody>
              <tr>
                <th style="border:0">nom prénom</th>
                <td style="border:0">{{ lastname }} {{ firstname }}</td>
              </tr>
              <tr>
                <th style="border:0">nom d'utilisateur</th>
                <td style="border:0">{{ username }}</td>
              </tr>
              <tr>
                <th style="border:0">email</th>
                <td style="border:0">{{ email }}</td>
              </tr>
              <tr>
                <th style="border:0">numéro de téléphone</th>
                <td style="border:0">{{ phoneNumber }}</td>
              </tr>
              <tr>
                <th style="border:0">date de naissance</th>
                <td style="border:0">{{ birthday }}</td>
              </tr>
              <tr>
                <th style="border:0">adresse domcile</th>
                <td style="border:0">{{ address }}</td>
              </tr>
            </tbody>
          </table>
        </h5>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import axios from "axios";
import Vue from "vue";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    Tabs,
    TabPane
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      birthday: "",
      address: "",
      phoneNumber: "",
      driverLicence: "",
      email: "",
      roles: "",
      username: "",
      pointFidelity: ""
    };
  },
  mounted() {
    axios({
      url: "localhost:3000/api/v1/admin/user",
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x-access-token")
      }
    }).then(
      response => (
        (this.firstname = response.data.result[0].firstname),
        (this.lastname = response.data.result[0].lastname),
        (this.birthday = response.data.result[0].birthday),
        (this.address = response.data.result[0].address),
        (this.phoneNumber = response.data.result[0].phoneNumber),
        (this.driverLicence = response.data.result[0].driverLicence),
        (this.email = response.data.result[0].email),
        (this.roles = response.data.result[0].roles),
        (this.username = response.data.result[0].username),
        (this.pointFidelity = response.data.result[0].pointFidelity)
      )
    );
  }
};
</script>
<style>
th {
  padding: 5px;
  text-align: left;
}
table {
  width: 100%;
}
</style>
