<template>
  <app-main class="wallet-page">
    <h1>Мой кошелёк</h1>
    <app-wallet-currency />
  </app-main>
</template>

<script>
import AppMain           from '@/layouts/Main';
import AppWalletCurrency from '@/components/currency/WalletCurrency';

export default {
  name: 'Wallet',
  components: {
    AppMain,
    AppWalletCurrency,
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
.wallet-page {
  padding: 50px 0;
}
</style>
