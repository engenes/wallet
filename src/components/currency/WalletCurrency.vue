<template>
  <transition name="fade">
    <div
      v-if="loaded"
      class="currencies"
    >
      <div>
        <app-balance-card
          v-for="item in balance_items"
          :id="item.id"
          :key="item.id"
          :name="item.name"
          :type="item.type"
          :value="item.value"
          :min_withdraw="item.min_withdraw"
          @onDeposit="deposit"
          @onWithdraw="withdraw"
        />
      </div>
      <app-panel
        ref="wallet"
        v-model="visible_panel"
      >
        <template #header>
          {{ panel_title }}
        </template>
        <app-deposit-form
          v-if="op_type === 'deposit'"
          :currency="open_currency"
        />
        <app-withdraw-form
          v-else-if="op_type === 'withdraw'"
          :currency="open_currency"
        />
      </app-panel>
    </div>
    <app-preloader v-else />
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppBalanceCard             from '@/components/currency/BalanceCard';
import AppPanel                   from '@/components/popup/Panel';
import AppDepositForm             from '@/components/forms/DepositForm';
import AppWithdrawForm            from '@/components/forms/WithdrawForm';
import AppPreloader               from '@/components/Preloader';

export default {
  name: 'WalletCurrency',
  components: {
    AppBalanceCard,
    AppPanel,
    AppDepositForm,
    AppWithdrawForm,
    AppPreloader,
  },

  mounted() {
    // Запускаем загрузку данные по балансу пользователя и по валюте
    this.$store.dispatch('currency/loadCurrency');
    this.$store.dispatch('balance/loadBalance');
  },
  data() {
    return {
      visible_panel: false,
      open_currency_id: null,
      op_type: null,
    };
  },
  computed: {
    ...mapGetters('balance', [
      'balance_items',
      'loaded',
    ]),

    // Извлекаем объект текущей валюты со склада
    open_currency() {
      return this.open_currency_id ? this.$store.getters['balance/balance_item'](this.open_currency_id) : null;
    },

    // Задаем заголовок, для боковой панели
    panel_title() {
      return this.op_type === 'deposit'
        ? `Купить ${this.open_currency.name}`
        : this.op_type === 'withdraw' ? `Продать ${this.open_currency.name}` : null;
    },
  },
  methods: {
    deposit(id) {
      this.open_currency_id = id;
      this.$refs.wallet.show();
      this.op_type = 'deposit';
    },
    withdraw(id) {
      this.open_currency_id = id;
      this.$refs.wallet.show();
      this.op_type = 'withdraw';
    },
  },
};
</script>

<style scoped lang="scss">
.preloader {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.fade-enter-active {
  transition: opacity .7s;
}

.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

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
