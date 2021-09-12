import { calcRate, rounded } from '@/helpers/helpers';

export default {
  updateBalance(state, { data, currencies_list }) {
    // Устанавливаем баланс по всем валютам для текущего пользователя
    state.balance = currencies_list.map((currency) => {
      const item     = data.find((el) => el.id === currency.id);
      currency.value = item && item.balance ? item.balance : 0;
      return currency;
    });
  },
  updateBalanceItem(state, payload) {
    /*
     Обновляем валюты
     @todo Если валюты будут объектом а не массивом, то можно не делать перебор, а обновить нужную по ключу,
     но там там уже по обстоятельствам, если того потребует задача, ну и смотря что придет с сервера.
     Возможно, менее затратно пройтись по массиву из 200 - 300 валют, чем создать объект, а потом с ним работать...
     */
    state.balance = state.balance.map((item) => {
      if (item.id === payload.currency_id) {
        if (payload.type === 'deposit') {
          item.value += calcRate(item.rate, payload.value);
        } else if (payload.type === 'withdraw') {
          item.value = rounded(item.value - parseFloat(payload.value), 7);
        }
      }
      return item;
    });
  },
  setBalanceLoading(state) {
    state.loaded = true;
  },
};
