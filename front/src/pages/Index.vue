<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('image')"></parallax>
      <div class="container">
        <div class="content-center brand logo">
          <img class="n-logo" src="img/now-logo.png" alt />
          <h1 class="h1-seo">Location Car Concept</h1>
          <h3>Louer votre voiture à prix défiant toute concurence.</h3>
          <p>&nbsp;</p>
          <div class="carImage">
            <img :src="image" class />
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">Les offres du moment</h2>

            <h5 class="description">
              <Offers />
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">Explorez Paris à bord d'une voiture de Location Car Concept</h2>
            <h5
              class="description"
            >Afin de répondre au mieux aux attentes de nos clients, notre société dispose d'un large éventail de véhicules issus des ateliers 
            de constructeurs réputés : BMW, Audi, Peugeot, Maserati, Mercedes, Renault etc. Que vous souhaitiez louer une voiture de sport 
            dernier cri, une voiture de tourisme ou encore un utilitaire pour votre déménagement, notre outil de réservation en ligne vous 
            permet de comparer les prix et de choisir la catégorie de voiture de votre choix. Nous vous donnons également la possibilité 
            d'effectuer votre réservation par téléphone. Louez une voiture à Paris en profitant de l'une de nos offres flexibles : que vous 
            prévoyiez une balade de quelques heures, que vous ayez besoin d'un véhicule pas cher pour le week-end ou même plusieurs semaines, 
            notre société a pour volonté de s'adapter à vos besoins et de vous offrir l'expérience de location la plus confortable possible.</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from "@/components";
import Offers from "../components/Offers";

export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    Parallax,
    Offers
  },
  data() {
    return {
      image: require("@/assets/static/images/logo.png")
    };
  }
};
</script>
<style>
.logo {
  margin-top: 20px;
}
.carImage {
  margin-top: 50px;
}
</style>
