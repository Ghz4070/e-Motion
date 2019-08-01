<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('image')"></parallax>
      <div class="container">
        <div class="content-center brand logo">
          <img class="n-logo" src="img/now-logo.png" alt />
          <h1 class="h1-seo">Location Car Concept</h1>
          <h3>Louer votre voiture à prix défiant toute concurence.</h3>
          <p>&nbsp; </p>
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
            <h2 class="title">Completed with examples</h2>
            <h5 class="description">
              The kit comes with three pre-built pages to help you get started
              faster. You can change the text and images and you're good to go.
              More importantly, looking at them will give you a picture of what
              you can built with this powerful Bootstrap 4 ui kit.
            </h5>
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
  margin-top:20px;
}
.carImage{
  margin-top:50px;
}
</style>
