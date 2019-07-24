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

                        <n-radio v-model="available" label="0">Disponible</n-radio>
                        <n-radio v-model="available" label="1">Indisponible</n-radio>

                    </template>
                    <div class="card-footer text-center">
                        <n-button type="neutral" round size="lg" v-on:click="respData">Créer</n-button>
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

    export default {
        name: 'CreateVehicle',
        components: {
            Card,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            [Radio.name]: Radio,
        },
        data() {
            return {
                available: '',
                datePurchase: '',
                price: '',
                nbKm: '',
                licensePlate: '',
                color: '',
                numerSerie: '',
                model: '',
                brand: '',
            }
        },
        respData: function () {
            const convertDatepicker = this.datePurchase.toISOString();
            const datePickerLessT = convertDatepicker.replace('T', ' ');
            const finalDate = datePickerLessT.replace('Z', '');

            axios.post('http://localhost:3000/api/v1/admin/vehicle/add', {
                available: this.available,
                datePurchase: finalDate,
                price: this.price,
                nbKm: this.nbKm,
                licensePlate: this.licensePlate,
                color: this.color,
                numerSerie: this.numerSerie,
                model: this.model,
                brand: this.brand
            })
                .then((result) => {
                    console.log(result);
                    if (result.data.status == "success") {
                        this.$router.push('/');
                    }
                })
                .catch((err) => console.log(err))
        }
    }
</script>
<style>
</style>
