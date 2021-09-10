<template>
  <div class="currencies">
    <template v-if="balance_items">
      <app-balance-item
        v-for="item in balance_items"
        :id="item.id"
        :key="item.id"
        :name="item.name"
        :type="item.type"
        :value="item.value"
        :min_withdraw="item.min_withdraw"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppBalanceItem             from '@/components/currency/BalanceItem';

export default {
  name: 'WalletCurrency',
  components: {
    AppBalanceItem,
  },
  mounted() {
    this.$store.dispatch('currency/loadCurrency');
    this.$store.dispatch('balance/loadBalance');
  },
  computed: {
    ...mapGetters('balance', [
      'balance_items',
    ]),
  },
};
</script>

<style scoped lang="scss">
.currencies {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px 24px;
  border: 1px solid #F2F7FF;
}
</style>
