export default {
  updateCurrency(state, payload) {
    state.currency = payload;
  },
  updateLoadStatus(state) {
    state.loded = true;
  },
};
