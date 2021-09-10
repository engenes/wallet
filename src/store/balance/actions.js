import Balance from '@/api/Balance';

export default {
  async loadBalance({ commit }) {
    const { status, data } = await Balance.get();
    if (status) {
      commit('updateBalance', data);
      commit('updateLoadStatus');
    }
  },
};
