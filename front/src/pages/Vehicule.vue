<template>

  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('img/header.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt="" />
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
              DIV 12 MD 
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Parallax } from '@/components';

export default {
  name: 'vehicule',
  bodyClass: 'index-page',
  components: {
  },
  data () {
    return {
      post: null,
      error: null
    }
  },created(){
      console.log('antoine');
  }

};
</script>
<style></style>
