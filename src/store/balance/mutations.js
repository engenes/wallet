export default {
  updateBalance(state, payload) {
    state.balance = payload;
  },
  updateLoadStatus(state) {
    state.loaded = true;
  },
};
