<template>
    <div>
        <div class="page-header clear-filter" filter-color="orange">
    <div class="">
      <div style="position: relative;" class="text-center">
        <router-link class="nav-link" to="/">
        <n-button type="primary" >Accueil</n-button>
        </router-link>
        </div>
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <h1>Connexion</h1>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Identifiant"
              v-model="username"
              required
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Mot de passe"
              type="password"
              v-model="password"
              required
            >
            </fg-input>

            <template>
              <div class="card-footer text-center">
                <n-button type="neutral" round size="lg"  v-on:click="connect">Connectez-vous</n-button>
              </div>
              <div class="pull-left">
                <h6>
                  <a href="#pablo" class="link footer-link">Create Account</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="#pablo" class="link footer-link">Need Help?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
    </div>
</template>

<script>

import { Card, Button, FormGroupInput } from '@/components';
import MainFooter from '@/layout/MainFooter';
import axios from 'axios';

    export default {
        name:'FormLogin',
        components: {
            Card,
            MainFooter,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        },
        data() {
            return {
            username : '',
            password: ''
            }
        },
        methods:{
            connect: function(){
            axios.post('http://localhost:3000/api/v1/user/login', {
                username: this.username,
                password: this.password
            })
            .then((result) => {
                console.log(result)
                if(result.data.status == "success"){
                localStorage.setItem('x-access-token', result.data.result);
                this.$router.push('/');
                }
            })
            .catch((err) => console.log(err))
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>