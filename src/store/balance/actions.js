import Balance from '@/api/Balance';

export default {
  async loadBalance({ commit, rootGetters }) {
    const { status, data } = await Balance.get();
    if (status) {
      const currencies_list = rootGetters['currency/currenciesList'];
      commit('updateBalance', { data, currencies_list });
      commit('setBalanceLoading');
    }
  },
  async depositBalance({ commit }, payload) {
    const { status } = await Balance.send(payload);
    if (status) {
      payload.type = 'deposit';
      commit('updateBalanceItem', payload);
      return true;
    }
    return false;
  },
  async withdrawBalance({ commit }, payload) {
    const { status } = await Balance.send(payload);
    if (status) {
      payload.type = 'withdraw';
      commit('updateBalanceItem', payload);
      return true;
    }
    return false;
  },
};
