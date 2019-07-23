<template>
    <div
    class="section section-signup"
    style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
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
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Nom"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="lastname"
            >
            </fg-input>

            <fg-input>
              <el-date-picker v-model="datePicker"
                  popper-class="date-picker-primary"
                  type="date"
                  placeholder="Select date">
                </el-date-picker>
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Adresse"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="address"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Numéro de téléphone"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="telNumber"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Numéro de permis de conduire"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="driverNumber"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Identifiant"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="username"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Email"
              addon-left-icon="now-ui-icons ui-1_email-85"
              v-model="mail"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Mot de passe"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="password"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Mot de passe x2"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="passwords"
            >
            </fg-input>

          </template>
          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg"  v-on:click="testData">Get Started</n-button>
          </div>
        </card>
      </div>
      <div class="col text-center">
        <router-link
          to="/login"
          class="btn btn-simple btn-round btn-white btn-lg"
        >
          View Login Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, FormGroupInput, Button } from '@/components';
import {DatePicker} from 'element-ui';
import axios from 'axios';
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
            passwordChecked:''
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
          testData: function (){

            axios.get('http://localhost:3000/api/v1/admin/user', {
              firstname: this.firstname,
              lastname: this.lastname,
              birthday: this.datePicker,
              address: this.address,
              phoneNumber: this.telNumber,
              driverLicence: this.driverNumber,
              password: this.checkPassword(),
              email: this.mail,
              username:this.username 
            })
            .then((result) => {
              console.log(result)
            })
            .catch((err) => console.log(err))
            /*
            console.log(this.checkPassword())
            console.log(`Le prénom ${this.firstname}, son nom ${this.lastname}, sa date de naissance ${this.datePicker}, son adresse ${this.address}, son numéro de tel ${this.telNumber}
            , permis ${this.driverNumber}, l'identifiant ${this.username}, mail est ${this.mail}, le mdp ${this.password}, le derniere mdp ${this.passwords}`)
            */          
          }
        },
        components: {
            Card,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            [FormGroupInput.name]:FormGroupInput
        }
    }
</script>

<style scoped>

</style>