<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <h3 class="title">Listes des offres</h3>
            <p></p>
            <ul>
                <li v-for="offer in offers"> {{ offer.idoffers }}, {{ offer.title }}, {{ offer.price }}, {{ offer.description }},
                    {{ offer.penality }}, {{ offer.nbKm }}, {{ offer.pointFidelityOffers }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name: "listOffers",
        data() {
            return {
                offers: ''
            };
        },
        mounted() {
            console.log();
            axios({
                url: "http://localhost:3000/api/v1/offer",
                method: "get",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }).then(
                response => (
                    (this.offers = response.data.result)
                )
            );
        }
    };
</script>
<style></style>