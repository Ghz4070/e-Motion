<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <router-link to="/mention">
                    Mention légales
                </router-link>
          </li>
          <!-- <li>
            <a href="https:///presentation.creative-tim.com">
              Contact
            </a>
          </li> -->
        </ul>
      </nav>
      <div class="copyright">
        
        &copy; {{ year }}
      </div>
    </div>
  </footer>
</template>
<script>

export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
.footer {
  position: inherit;
  bottom: 0;
  width: 100%;
}
</style>
