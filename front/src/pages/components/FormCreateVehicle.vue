<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <div class="row">
                <card class="card-signup" header-classes="text-center" color="orange">
                    <template slot="header">
                        <h3 class="card-title title-up">formulaire vehicule</h3>
                    </template>
                    <template>

                        <fg-input
                                class="no-border"
                                placeholder="Marque"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="brand"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Modele"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="model"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Numero de serie"
                                addon-left-icon="now-ui-icons ui-1_email-85"
                                v-model="numerSerie"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="couleur"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="color"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="N° d'immatriculation"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="licensePlate"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Nombre de kilometre"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="nbKm"
                        >
                        </fg-input>
                        <fg-input>
                            <el-date-picker
                                    popper-class="date-picker-primary"
                                    type="date"
                                    placeholder="date d'achat"
                                    v-model="datePurchase"
                            >
                            </el-date-picker>
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="Prix"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="price"
                        >
                        </fg-input>

                        <v-select :options="options"></v-select>

                    </template>
                    <div class="card-footer text-center">
                        <n-button type="neutral" round size="lg" v-on:click="createVehicle">Créer</n-button>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import {Card, FormGroupInput, Button, Radio} from '@/components';
    import {DatePicker} from 'element-ui';
    import axios from 'axios';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default {
        name: 'FormCreateVehicle',
        components: {
            Card,
            vSelect,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            [Radio.name]: Radio,
        },
        data() {
            return {
                datePurchase: '',
                price: '',
                nbKm: '',
                licensePlate: '',
                color: '',
                numerSerie: '',
                model: '',
                brand: '',
                options: [],
            }
        },
        methods: {
            createVehicle: function () {
                const convertDatepicker = this.datePurchase.toISOString();
                const datePickerLessT = convertDatepicker.replace('T', ' ');
                const finalDate = datePickerLessT.replace('Z', '');

                axios({
                    url: 'http://localhost:3000/api/v1/admin/vehicle/add',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('x-access-token')
                    },
                    data: {
                        available: '1', //true
                        datePurchase: finalDate,
                        price: this.price,
                        nbKm: this.nbKm,
                        licensePlate: this.licensePlate,
                        color: this.color,
                        serialNumber: this.numerSerie,
                        model: this.model,
                        brand: this.brand,
                        lising: '0', // a modifier
                        offers_idoffers: this.options,
                    }
                })
                    .then((response) => {
                        console.log(response)
                    })
            }
        },
        created() {
            axios
                .get('http://localhost:3000/api/v1/offer') //recup all offers
                .then(response => {
                    for (let i in response.data.result) {
                        this.options.push(response.data.result[i].title)
                    }
                })
                .catch(error => console.log(error))
        }
    }
</script>
<style>
</style>