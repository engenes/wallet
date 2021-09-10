import Vue      from 'vue';
import Vuex     from 'vuex';
import balance  from './balance';
import currency from './currency';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    balance,
    currency,
  },
  strict: process.env.NODE_ENV !== 'production',
});
