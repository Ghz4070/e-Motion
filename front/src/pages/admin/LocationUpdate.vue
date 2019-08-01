<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <div class="photo-container"></div>
        <h3 class="title">Location Update</h3>
        <p></p>
        <p class="category"></p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Gerer les locations</h3>
        <hr />
        <div>
          <fg-input placeholder="Titre" v-model="firstname" disabled></fg-input>
          <fg-input placeholder="Prix" v-model="lastname" disabled></fg-input>
          <fg-input>
            <el-date-picker
              v-model="startDate"
              popper-class="date-picker-primary"
              type="date"
              placeholder="Date de naissance"
            ></el-date-picker>
          </fg-input>
          <fg-input>
            <el-date-picker
              v-model="endDate"
              popper-class="date-picker-primary"
              type="date"
              placeholder="Date de naissance"
            ></el-date-picker>
          </fg-input>
          <fg-input placeholder="Nombre de km" v-model="status"></fg-input>
          <fg-input placeholder="Point de fidélité offert" v-model="finalPrice"></fg-input>
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
      test: "",
      startDate: "",
      endDate: "",
      status: "",
      finalPrice: "",
      firstname: "",
      lastname: ""
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
      let idLocation = this.$route.params.id;
      axios({
        url: "http://localhost:3000/api/v1/admin/location/" + idLocation,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(
        response => (
          (this.startDate = response.data[0].startDate),
          (this.endDate = response.data[0].endDate),
          (this.status = response.data[0].status),
          (this.finalPrice = response.data[0].finalPrice),
          (this.firstname = response.data[0].firstname),
          (this.lastname = response.data[0].lastname)
        )
      );
    },
    UpdateInfo: function() {
      let idLocation = this.$route.params.id;

      var first = new Date(this.startDate);
      const convertDatepicker1 = first.toISOString();
      const datePickerLessT1 = convertDatepicker1.replace("T", " ");
      const finalDate1 = datePickerLessT1.replace("Z", "");

      var second = new Date(this.endDate);
      const convertDatepicker2 = second.toISOString();
      const datePickerLessT2 = convertDatepicker2.replace("T", " ");
      const finalDate2 = datePickerLessT2.replace("Z", "");

      axios
        .patch(
          "http://localhost:3000/api/v1/admin/location/" + idLocation,
          {
            startDate: finalDate1,
            endDate: finalDate2,
            status: this.status,
            finalPrice: this.finalPrice
            /* firstname: this.firstname,
            lastname: this.lastname, */
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
            this.$router.push("/admin/locations");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
