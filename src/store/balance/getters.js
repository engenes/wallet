export default {
  balance_items(state, getters, rootState, rootGetters) {
    const currencies_list = rootGetters['currency/currenciesList'];
    const balance_list    = [];

    // Перебираем все валюты чтобы присоединить баланс пользователя
    currencies_list.forEach((currency) => {
      const item = state.balance.find((el) => el.id === currency.id);
      balance_list.push({
        id: currency.id,
        min_withdraw: currency.min_withdraw,
        name: currency.name,
        type: currency.type,
        value: item && item.balance ? item.balance : 0,
      });
    });
    console.log(balance_list);
    return state.loaded ? balance_list : null;
  },
};
