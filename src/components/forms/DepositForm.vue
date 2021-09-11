<template>
  <div class="deposit_currency">
    <app-currency-card
      :name="currency_data.name"
      :value="currency_data.value"
    />
    <form class="currency-form">
      <app-number-field />
    </form>
  </div>
</template>

<script>

import AppNumberField  from '@/components/inputs/NumberField';
import AppCurrencyCard from '@/components/currency/CurrencyCard';

export default {
  name: 'DepositForm',
  props: {
    currency: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppNumberField,
    AppCurrencyCard,
  },
  computed: {

  },
};
</script>

<style scoped>

</style>
