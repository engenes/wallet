export default {
  balance_items: (state) => state.balance,
  balance_item: (state) => (id) => state.balance.find((item) => item.id === id),
  loaded: (state) => state.loaded,
};
