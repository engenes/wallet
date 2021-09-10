import Currency from '@/api/Currency';

export default {
  async loadCurrency({ commit }) {
    const {
            status,
            data,
          } = await Currency.get();
    if (status) {
      commit('updateCurrency', data);
      commit('updateLoadStatus');
    }
  },
};
