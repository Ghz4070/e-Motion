<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="photo-container"></div>
        <h3 class="title">Utilsiateurs Update</h3>
        <p></p>
        <p class="category"></p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Gerer les utilsiateurs</h3>
        <hr />
        <div>
          <fg-input placeholder="Nom" v-model="firstname"></fg-input>
          <fg-input placeholder="Prenom" v-model="lastname"></fg-input>
          <fg-input>
            <el-date-picker
              v-model="birthday"
              popper-class="date-picker-primary"
              type="date"
              placeholder="Date de naissance"
            ></el-date-picker>
          </fg-input>
          <fg-input placeholder="Nom d'utilisateur" v-model="username"></fg-input>
          <fg-input placeholder="Addresse" v-model="address"></fg-input>
          <fg-input placeholder="Phone" v-model="phoneNumber"></fg-input>
          <fg-input placeholder="Num. permis" v-model="driverLicence"></fg-input>
          <fg-input placeholder="Roles" v-model="roles"></fg-input>
          <fg-input placeholder="Email" v-model="email"></fg-input>
          <fg-input placeholder="Point de fidélité" v-model="pointFidelity"></fg-input>
          <fg-input placeholder="Token Reset Password" v-model="tokenResetPassword"></fg-input>
          <fg-input placeholder="TokenValidate Account" v-model="tokenValidateAccount"></fg-input>
          
        </div>
        <div class="text-center">
          <n-button v-on:click="UpdateInfo">Sauvegarder</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, FormGroupInput as FgInput, Modal } from "@/components";
import axios from "axios";
import { DatePicker } from "element-ui";
import { setTimeout } from "timers";

export default {
  name: "LocationUpdate",
  props: {},
  components: {
    [Button.name]: Button,
    FgInput,
    Modal
  },
  data() {
    return {
      lastname:"",
      firstname: "",
      birthday: "",
      username: "",
      roles: "",
      licensePlate: "",
      email: "",
      pointFidelity: "",
      phoneNumber: "",
      address: "",
      driverLicence: "",
      tokenResetPassword: "",
      tokenValidateAccount: "",
    };
  },
  mounted() {
    this.getInfo();
  },
  updated() {
    // this.getInfo()
  },
  methods: {
    getInfo: function() {
      let idUser = this.$route.params.id;
      axios({
        url: "http://localhost:3000/api/v1/admin/user/info/" + idUser,
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
          (this.roles = response.data.result[0].roles),
          (this.email = response.data.result[0].email),
          (this.pointFidelity = response.data.result[0].pointFidelity),
          (this.username = response.data.result[0].username),
          (this.tokenResetPassword = response.data.result[0].tokenResetPassword),
          (this.tokenValidateAccount = response.data.result[0].tokenValidateAccount)
        )
      );
    },
    UpdateInfo: function() {
      let idUser = this.$route.params.id;

      var first = new Date(this.birthday);
      const convertDatepicker1 = first.toISOString();
      const datePickerLessT1 = convertDatepicker1.replace("T", " ");
      const finalDate1 = datePickerLessT1.replace("Z", "");

      axios
        .patch(
          "http://localhost:3000/api/v1/admin/user/update/" + idUser,
          {
            firstname: this.firstname,
            lastname: this.lastname,
            birthday: finalDate1,
            address: this.address,
            phoneNumber: this.phoneNumber,
            driverLicence: this.driverLicence,
            roles: this.roles,
            email: this.email,
            pointFidelity: this.pointFidelity,
            username: this.username,
            tokenResetPassword: this.tokenResetPassword,
            tokenValidateAccount: this.tokenValidateAccount
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        )
        .then(result => {
          console.log(result);
          if (result.data.status == "success") {
            this.hideOrNot = "donthide";
            this.$router.push("/admin/users");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
