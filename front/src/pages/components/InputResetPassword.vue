<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <p v-if="error == false">
                  <Alert type="danger">Les mots de passes sont incorrectes ou pas renseignés </Alert>
            </p>
            <p v-else-if="error == true">
                <Alert type="success">Félication vous avez réinistiallisé votre mot de passe, un mail sera envoyé pour le confirmer</Alert>
            </p>
            <fg-input
                class="no-border input-lg"
                type="password"
                addon-left-icon="now-ui-icons users_circle-08"
                placeholder="Votre nouveau mot de passe"
                v-model="password"
                required>
            </fg-input>
            <fg-input
                class="no-border input-lg"
                type="password"
                addon-left-icon="now-ui-icons users_circle-08"
                placeholder="Confirmer votre nouveau mot de passe"
                v-model="passwords"
                required>
            </fg-input>
            <n-button v-on:click="resetPasswordMail">Envoyez</n-button>
        </div>
    </div>
</template>

<script>
    
    import { Button, FormGroupInput, Alert } from '@/components';
    import axios from 'axios';
import { setTimeout } from 'timers';

    export default {
        name: 'InputResetPassword',
        components:{
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            Alert
        },
        data(){ 
            return {
                error: 'oui',
                password:'',
                passwords:''
            }
        },
        methods:{
            resetPasswordMail: function(){
                if(this.checkPassword() == true){
                    axios({
                        method:'post',
                        url:'http://localhost:3000/api/v1/user/reset_password?token='+this.$route.query.token,
                        data: {
                            firstPassword: this.password, 
                            secondPassword: this.passwords
                        }})
                    .then((result)=> {
                        this.error = true;
                        console.log(result)
                        setTimeout(()=> {
                            this.$router.push('/');
                        }, 3000)  
                    })
                    .catch((err)=>console.log(err))
                }else{
                    this.error = false
                }
            },
            checkPassword: function(){
                if(this.password === this.passwords && this.password != '' && this.passwords != ''){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>