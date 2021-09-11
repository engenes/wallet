<template>
  <div class="currencies">
    <div>
      <template v-if="balance_items">
        <app-balance-card
          v-for="item in balance_items"
          :id="item.id"
          :key="item.id"
          :name="item.name"
          :type="item.type"
          :value="item.value"
          :min_withdraw="item.min_withdraw"
          @onDeposit="deposit"
        />
      </template>
    </div>
    <app-panel
      ref="wallet"
      v-model="visible_panel"
    >
      <template #header>
        Здесь мог быть заголовок страницы
      </template>
      <app-deposit-form :id="open_currency" />
    </app-panel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppBalanceCard             from '@/components/currency/BalanceCard';
import AppPanel                   from '@/components/popup/Panel';
import AppDepositForm             from '@/components/forms/DepositForm';

export default {
  name: 'WalletCurrency',
  components: {
    AppBalanceCard,
    AppPanel,
    AppDepositForm,
  },

  mounted() {
    this.$store.dispatch('currency/loadCurrency');
    this.$store.dispatch('balance/loadBalance');
  },
  data() {
    return {
      visible_panel: false,
      open_currency: null,
    };
  },
  computed: {
    ...mapGetters('balance', [
      'balance_items',
    ]),
  },
  methods: {
    deposit(id) {
      this.open_currency = id;
      this.$refs.wallet.show();
    },
  },
};
</script>

<style scoped lang="scss">
.currencies {
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid #F2F7FF;
}

@media (min-width: 668px) {
  .currencies {
    border: initial;
    padding: 0;

    > div {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -7px;

      > * {
        width: 50%;
      }
    }
  }
}

@media (min-width: 998px) {
  .currencies {

    > div {
      margin: 0 -7px;

      > * {
        width: calc(100% / 3);
      }
    }
  }
}

@media (min-width: 1240px) {
  .currencies {

    > div {
      margin: 0 -7px;

      > * {
        width: 25%;
      }
    }
  }
}
</style>
