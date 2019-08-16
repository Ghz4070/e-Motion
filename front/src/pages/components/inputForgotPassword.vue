<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <p v-if="error == false">
                  <Alert type="danger">Veuillez renseigner l'adresse mail</Alert>
            </p>
            <p v-if="success == true">
                <Alert type="success">Un mail vous a été envoyé pour réinistiallisé votre mot de passe</Alert>
            </p>
            <fg-input
                class="no-border input-lg"
                addon-left-icon="now-ui-icons users_circle-08"
                placeholder="Votre email"
                v-model="email"
                required>
            </fg-input>
            <n-button v-on:click="resetPasswordMail">Envoyez</n-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Button, FormGroupInput, Alert } from '@/components';

    export default {
        name: 'inputForgotPassword',
        components: {
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            Alert
        },
        data(){
           return {
               email:'',
               error:'oui',
               success:'oui'
           }
        },
        methods:{
            resetPasswordMail: function(){
                if(this.email){
                    axios.get('http://localhost:3000/api/v1/user/forgot_password?email='+this.email)
                    .then((result)=>{
                        console.log(email)
                        
                        this.error= 'oui';
                        this.success = true;
                    
                    })
                    .catch((err) => {this.error = false; this.success ='oui';})
                }else{
                    this.error = false;
                    this.success = 'oui';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>