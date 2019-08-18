<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <div v-bind:class="hideOrNot">
                <Alert type="success"><span class="alert-link">{{ account }}</span></Alert>
            </div>
            <div class="row">
                <card class="card-signup mt-5" style="background-color: transparent">
                    <p v-if="errors.length">
                       <Alert type="danger">Des champs non pas étaient remplis, il vous reste <span class="alert-link">{{errors.length}}</span> à remplir</Alert>
                    </p>
                    <p v-if="differentPassword">
                       <Alert type="danger">Le mot de passe n'est pas le même que la confirmation</Alert>
                    </p>                    
                    <template slot="header">
                        <h3 class="card-title title-up">Créé votre compte</h3>
                    </template>
                    <template>
                        <div v-if="errors.includes('Le prénom est obligatoire')">
                            <fg-input
                                        class="no-border has-danger"
                                        placeholder="Le prénom est obligatoire, n'oubliez pas ce champs"
                                        addon-left-icon="now-ui-icons users_circle-08"
                                        v-model="firstname"
                            ></fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre prénom"
                                    addon-left-icon="now-ui-icons users_circle-08"
                                    v-model="firstname"
                            ></fg-input>
                        </div>

                        <div v-if="errors.includes('Le nom est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="Le nom est obligatoire, n'oubliez pas ce champs"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="lastname"
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre nom"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="lastname"
                            >
                            </fg-input>
                        </div>
                        
                        <div v-if="errors.includes('La date est obligatoire')">
                            <fg-input>
                                <el-date-picker v-model="datePicker"
                                            popper-class="date-picker-primary has-danger"
                                            type="date"
                                            placeholder="La date est obligatoire, n'oubliez pas ce champs"
                                            required
                                >
                                </el-date-picker>
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input>
                                <el-date-picker v-model="datePicker"
                                                popper-class="date-picker-primary"
                                                type="date"
                                                placeholder="Votre date de naissance"
                                                required
                                >
                                </el-date-picker>
                            </fg-input>
                        </div>

                        <div v-if="errors.includes('L\'adresse est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="Votre adresse est obligatoire, n'oubliez pas ce champs"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="address"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre adresse"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="address"
                                    required
                            >
                            </fg-input>
                        </div>

                        <div v-if="errors.includes('Le numéro de téléphone est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="Le numéro de téléphone est obligatoire, n'oubliez pas ce champs"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="telNumber"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre numéro de téléphone"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="telNumber"
                                    required
                            >
                            </fg-input>
                        </div>

                        <div v-if="errors.includes('Le permis de conduire est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="Le permis de conduire est obligatoire, n'oubliez pas ce champs"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="driverNumber"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre numéro de permis de conduire"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="driverNumber"
                                    required
                            >
                            </fg-input>
                        </div>

                        <div v-if="errors.includes('L\'identifiant est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="L'identifiant est obligatoire, n'oubliez pas ce champs"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="username"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre identifiant"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="username"
                                    required
                            >
                            </fg-input>
                        </div>

                        <div v-if="errors.includes('L\'adresse mail est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="L'adresse mail est obligatoire, n'oubliez pas ce champs"
                                    type="email"
                                    addon-left-icon="now-ui-icons ui-1_email-85"
                                    v-model="mail"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre email"
                                    type="email"
                                    addon-left-icon="now-ui-icons ui-1_email-85"
                                    v-model="mail"
                                    required
                            >
                            </fg-input>
                        </div>


                        <div v-if="errors.includes('Le mot de passe est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    placeholder="Le mot de passe est obligatoire, n'oubliez pas ce champs"
                                    type="password"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="password"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    placeholder="Votre mot de passe"
                                    type="password"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="password"
                                    required
                            >
                            </fg-input>
                        </div>

                        <div v-if="errors.includes('La confirmation de mot de passe est obligatoire')">
                            <fg-input
                                    class="no-border has-danger"
                                    type="password"
                                    placeholder="La confirmation de mot de passe est obligatoire, n'oubliez pas ce champs"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="passwords"
                                    required
                            >
                            </fg-input>
                        </div>
                        <div v-else>
                            <fg-input
                                    class="no-border"
                                    type="password"
                                    placeholder="Confirmation de votre mot de passe"
                                    addon-left-icon="now-ui-icons text_caps-small"
                                    v-model="passwords"
                                    required
                            >
                            </fg-input>
                        </div>
                    </template>
                    <div class="card-footer text-center">
                        <n-button type="neutral" round size="lg" v-on:click="Signup">Créer</n-button>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
    import {Card, FormGroupInput, Button, Alert} from '@/components';
    import {DatePicker} from 'element-ui';
    import axios from 'axios';
    import {setTimeout} from 'timers';
    //import {checkInput} from '../../function/checkInput';

    export default {
        name: 'FormSignup',
        data() {
            return {
                datePicker: '',
                firstname: '',
                lastname: '',
                address: '',
                telNumber: '',
                driverNumber: '',
                username: '',
                mail: '',
                password: '',
                passwords: '',
                passwordChecked: '',
                account: '',
                hideOrNot: 'hide',
                errors: [],
                differentPassword:'',
            }
        },
        methods: {
            checkPassword: function () {
                if (this.password == this.passwords) {
                    this.differentPassword = false;
                    return this.passwordChecked = this.password
                } else {
                    this.differentPassword = true;
                    return 'Erreur'
                }
            },
            checkForm: function (){
                if(this.datePicker && this.firstname && this.lastname  && this.address && this.telNumber &&
                this.driverNumber && this.username && this.mail && this.password && this.passwords){
                    return true
                }
                
                this.errors =[]
                
                if(!this.datePicker){
                    this.errors.push('La date est obligatoire');
                }

                if(!this.firstname){
                    this.errors.push('Le prénom est obligatoire');
                }
                if(!this.lastname){
                    this.errors.push('Le nom est obligatoire');
                }
                if(!this.address){
                    this.errors.push('L\'adresse est obligatoire');
                }
                if(!this.telNumber){
                    this.errors.push('Le numéro de téléphone est obligatoire')
                }
                if(!this.driverNumber){
                    this.errors.push('Le permis de conduire est obligatoire');
                }
                if(!this.username){
                    this.errors.push('L\'identifiant est obligatoire');
                }
                if(!this.mail){
                    this.errors.push('L\'adresse mail est obligatoire');
                }
                if(!this.password){
                    this.errors.push('Le mot de passe est obligatoire');
                }
                if(!this.passwords){
                    this.errors.push('La confirmation de mot de passe est obligatoire');
                }
                console.log(this.errors)
                return this.errors
            }   
            ,
            Signup: function (e) {
                if(this.datePicker){
                    const convertDatepicker = this.datePicker.toISOString();
                    const datePickerLessT = convertDatepicker.replace('T', ' ');
                    const finalDate = datePickerLessT.replace('Z', '');
                }
                const check = this.checkPassword();
                const form = this.checkForm();

                if(form != true){
                    return e.preventDefault();
                    
                }

                if(check != 'Erreur'){

                    axios.post('http://localhost:3000/api/v1/user/add', {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        birthday: finalDate,
                        address: this.address,
                        phoneNumber: this.telNumber,
                        driverLicence: this.driverNumber,
                        password: this.checkPassword(),
                        email: this.mail,
                        username: this.username
                    })
                        .then((result) => {
                            console.log(result)
                            if (result.data.status == "success") {
                                this.account = "Votre compte a été créé, vous allez être redirectionné dans moins de 5 secondes";
                                this.hideOrNot = 'donthide';
                                setTimeout(() => {
                                    this.$router.push('/');
                                }, 5000);
                            }
                        })
                    .catch((err) => console.log(err))
                }
            }
        },
        components: {
            Card,
            Alert,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        }
    }
</script>

<style scoped>
    .hide {
        display: none;
    }

    .donthide {
        display: block;
    }
</style>