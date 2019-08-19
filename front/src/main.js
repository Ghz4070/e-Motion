import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import {DatePicker, Table} from 'element-ui';
import VueStripeCheckout from 'vue-stripe-checkout';

Vue.use(DatePicker)
Vue.use(Table)
Vue.use(VueStripeCheckout, 'pk_test_VUggmdO8yUVOFHUUYCUcKKbZ00FLUG97fh');

Vue.config.productionTip = false;

Vue.use(NowUiKit);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
