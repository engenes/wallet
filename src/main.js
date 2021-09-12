import Vue       from 'vue';
import Vuelidate from 'vuelidate';
import App       from './App.vue';
import router    from './router';
import store     from './store';
import '@/assets/scss/index.scss';

const format = require('format-number');

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Object.defineProperty(Vue.prototype, '$format', { value: format });
