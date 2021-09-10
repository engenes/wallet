<template>
  <app-main class="wallet-page">
    <h1>Мой кошелек</h1>
    <app-wallet-currency/>
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
};
</script>

<style scoped lang="scss">
.wallet-page {
  padding: 50px 0;
}
</style>
