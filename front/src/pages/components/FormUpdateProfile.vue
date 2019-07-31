<template>
<div>
  <n-button type="primary" @click.native="modals.classic = true">
        Modifier mes informations
    </n-button>
     <modal :show.sync="modals.classic" headerClasses="justify-content-center">
       <h4 slot="header" class="title title-up">Modifier mes informations</h4>
    <fg-input placeholder="Nom" v-model="lastname"></fg-input>
    <fg-input placeholder="Prenom" v-model="firstname"></fg-input>
    <fg-input placeholder="Adresse domicile" v-model="address"></fg-input>
    <fg-input>
      <el-date-picker v-model="birthday" popper-class="date-picker-primary"
                  type="date" placeholder="Date de naissance"></el-date-picker>
      </fg-input>
    <fg-input placeholder="Numero de telephone" v-model="phone"></fg-input>
    <fg-input placeholder="Numero permis de conduire" v-model="drivernum"></fg-input>
    <n-button v-on:click="UpdateInfo" @click.native="modals.classic = false">Sauvegarder</n-button>
     </modal>
  </div>
  <!-- <div>
      <n-button type="primary" @click.native="modals.classic = true">
        Classic modal
      </n-button>
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up">Modal title</h4>
        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live
          the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean. A small river named Duden flows by their place and supplies it with the necessary
          regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your
          mouth.</p>
        <template slot="footer">
          <n-button>Nice Button</n-button>
          <n-button type="danger" @click.native="modals.classic = false">Close</n-button>
        </template>
      </modal>
    </div> -->
   
</template>

<script>
import { Button, FormGroupInput as FgInput, Modal } from '@/components';
import axios from "axios";
import {DatePicker} from 'element-ui';
import { setTimeout } from 'timers';


export default {
  name: 'form-update-profile',
  props: {
  },
  components: {
      [Button.name]: Button,
      FgInput,
      Modal
  },
  data(){
        return {
          lastname: '',
          firstname: '',
          email: '',
          address: '',
          drivernum: '',
          birthday: '',
          phone: '',
          modals: {
            classic: false,
          }
        }
  },
  mounted() {
    this.getInfo()
  },
  updated() {
   // this.getInfo()
  },
  methods: {
    getInfo: function() {
      axios({
      url: "http://localhost:3000/api/v1/admin/user",
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
        (this.phone = response.data.result[0].phoneNumber),
        (this.drivernum = response.data.result[0].driverLicence),
        (this.email = response.data.result[0].email),
        (this.roles = response.data.result[0].roles),
        (this.username = response.data.result[0].username),
        (this.pointFidelity = response.data.result[0].pointFidelity)
      )
    );
    },
    UpdateInfo: function (){ 
          this.getInfo();
            var d = new Date(this.birthday);
            const convertDatepicker = d.toISOString();
            const datePickerLessT = convertDatepicker.replace('T', ' ');
            const finalDate = datePickerLessT.replace('Z', '');


            axios.patch('http://localhost:3000/api/v1/admin/user/modify', {
              firstname: this.firstname,
              lastname: this.lastname,
              birthday: finalDate,
              address: this.address,
              phoneNumber: this.phone,
              driverLicence: this.drivernum,
            },
            {headers: {
        "x-access-token": localStorage.getItem("x-access-token")
      }})
            .then((result) => {
              console.log(result)
              if(result.data.status == "success"){
                this.account = "Votre compte a été créé, vous allez être redirectionné dans moins de 5 secondes";
                this.hideOrNot = 'donthide';
                  this.$router.go();
              }
            })
            .catch((err) => console.log(err))     
          }
  }
};
</script>

<style scoped></style>
