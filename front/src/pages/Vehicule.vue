<template>
    <div>
        <div class="page-header clear-filter" filter-color="orange">
            <div class="container">
                <div class="content-center brand">
                    <img class="n-logo" src="img/now-logo.png" alt=""/>
                    <h1 class="h1-seo"> Page Véhicule </h1>
                    <h3>Liste des Véhicules</h3>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="section section-images">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">

                            <template v-for="vehicule in vehicules">

                                <card class="mr-5" style="width: 20rem;">
                                    <img slot="image" class="card-img-top" :src="imgSrc" alt="Card image cap">
                                    <div>
                                        <h3 class="card-title">{{vehicule.brand}}, {{vehicule.model}}</h3>
                                        <p class="card-text">Some quick example text to build on the card title and make
                                            up the bulk of the card's content.</p>
                                        <n-button type="primary">Go somewhere</n-button>
                                    </div>
                                </card>

                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {Card, Button} from '@/components';
    import axios from 'axios';

    export default {
        name: 'vehicule',
        bodyClass: 'index-page',
        components: {
            Card,
            [Button.name]: Button,
        },
        created() {
            axios
                .get('http://localhost:3000/api/v1/vehicle/available') //all pour tous
                .then(response => {
                    this.vehicules = response.data.result
                })
                .catch(error => console.log(error))
        },
        data() {
            return {
                vehicules: [],
                imgSrc: "https://www.numerama.com/content/uploads/2015/10/google-nouveau-logo-hd.jpg"

            }
        }
    };
</script>
<style></style>
