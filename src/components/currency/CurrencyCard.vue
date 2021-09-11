<template>
  <div
    class="currency-card"
    :class="currency_class"
  >
    <div class="currency-card__name">
      {{ name }}
    </div>
    <div class="currency-card__value">
      Текущий баланс: <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyCard',
  props: {
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    min_withdraw: {
      type: Number,
      default: null,
    },
  },
  computed: {
    currency_class() {
      return `currency-card_${this.name.toLowerCase()}`;
    },
  },
};
</script>

<style scoped>

</style>
