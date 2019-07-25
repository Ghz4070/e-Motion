<template>
    <div
    class="section section-signup"
    style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
      <div v-bind:class="hideOrNot">
        <Alert type="success"><span class="alert-link">{{ account }}</span></Alert>
      </div>
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Créé votre compte</h3>
          </template>
          <template>
            <fg-input
              class="no-border"
              placeholder="Prénom"
              addon-left-icon="now-ui-icons users_circle-08"
              v-model="firstname"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Nom"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="lastname"
              required
            >
            </fg-input>

            <fg-input>
              <el-date-picker v-model="datePicker"
                  popper-class="date-picker-primary"
                  type="date"
                  placeholder="Date de naissance"
                  required
                  >
                </el-date-picker>
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Adresse"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="address"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Numéro de téléphone"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="telNumber"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Numéro de permis de conduire"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="driverNumber"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Identifiant"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="username"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Email"
              type="email"
              addon-left-icon="now-ui-icons ui-1_email-85"
              v-model="mail"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Mot de passe"
              type="password"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="password"
              required
            >
            </fg-input>

            <fg-input
              class="no-border"
              type="password"
              placeholder="Mot de passe x2"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="passwords"
              required
            >
            </fg-input>

          </template>
          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg"  v-on:click="Signup">Créer</n-button>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, FormGroupInput, Button, Alert } from '@/components';
import {DatePicker} from 'element-ui';
import axios from 'axios';
import { setTimeout } from 'timers';

    export default {
        name:'FormSignup',
        data() {
          return {
            datePicker: '',
            firstname:'',
            lastname:'',
            address: '',
            telNumber:'',
            driverNumber:'',
            username:'',
            mail:'',
            password:'',
            passwords:'',
            passwordChecked:'',
            account:'',
            hideOrNot:'hide'
          }
        },
        methods:{
          checkPassword: function(){
              if(this.password == this.passwords){
                return this.passwordChecked = this.password
              }else{
                return 'Erreur'
              }
          },
          Signup: function (){
            const convertDatepicker = this.datePicker.toISOString();
            const datePickerLessT = convertDatepicker.replace('T', ' ');
            const finalDate = datePickerLessT.replace('Z', '');

            axios.post('http://localhost:3000/api/v1/user/add', {
              firstname: this.firstname,
              lastname: this.lastname,
              birthday: finalDate,
              address: this.address,
              phoneNumber: this.telNumber,
              driverLicence: this.driverNumber,
              password: this.checkPassword(),
              email: this.mail,
              username:this.username 
            })
            .then((result) => {
              console.log(result)
              if(result.data.status == "success"){
                this.account = "Votre compte a été créé, vous allez être redirectionné dans moins de 5 secondes";
                this.hideOrNot = 'donthide';
                setTimeout(()=> {
                  this.$router.push('/');
                },5000);
              }
            })
            .catch((err) => console.log(err))        
          }
        },
        components: {
            Card,
            Alert,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            [FormGroupInput.name]:FormGroupInput
        }
    }
</script>

<style scoped>
.hide {
  display: none;
}

.donthide{
  display: block;
}
</style>