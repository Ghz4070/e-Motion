<template>
  <div class="home">
    <Header></Header>
    <header class="masthead" style="background-image: url('https://www.thegreatpearler.com/wp-content/uploads/2019/03/image.jpg')">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <div class="page-heading">
                <h1>Titre</h1>
                <span class="subheading"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
              <article class="post-preview">
                <a href="#">
                  <h2 class="post-title">H2</h2>
                  <h3 class="post-subtitle">h3</h3>
                  <h3 class="post-subtitle">H3</h3>
                </a>
                <p class="post-meta">Posted by</p>
              </article>
          <hr>
        <!-- Pager -->
        <div class="clearfix">
          <a class="btn btn-primary float-right" href="#">View All Posts</a>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>
