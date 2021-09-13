<template>
  <div
    class="balance-card"
    :class="card_classes"
  >
    <div>
      <div class="balance-card__label">{{ name }} баланс</div>
      <div class="balance-card__value">{{ $format({ integerSeparator: ' ' })(value) }}</div>
      <div class="balance-card__actions">
        <button
          class="btn btn_main"
          @click="deposit"
        >
          Ввод
        </button>
        <button
          class="btn btn_main-alt"
          :class="{disabled: prevent_withdraw}"
          @click="withdraw"
        >
          Вывод
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    min_withdraw: {
      type: Number,
      required: true,
    },
  },
  computed: {
    card_classes() {
      return [
        `balance-card_${this.type}`,
        `balance-card_${this.name.toLowerCase()}`,
      ];
    },
    prevent_withdraw() {
      return this.value < this.min_withdraw;
    },
  },
  methods: {
    deposit() {
      this.$emit('onDeposit', this.id);
    },
    withdraw() {
      this.$emit('onWithdraw', this.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~app_scss/vars";

.balance-card {

  > div {
    padding: 15px 0 15px 70px;
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 15px;
      left: 0;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: #eee center/cover no-repeat;
    }
  }

  &:not(:last-child) {

    > div {
      border-bottom: 1px solid #f0f2f7;
    }
  }

  &_btc {

    > div {
      &::before {
        background-image: url("~app_images/c3.png");
      }
    }
  }

  &_usd {

    > div {
      &::before {
        background-image: url("~app_images/c4.png");
      }
    }
  }

  &_rub {

    > div {
      &::before {
        background-image: url("~app_images/c5.png");
      }
    }
  }

  &_ltc {

    > div {
      &::before {
        background-image: url("~app_images/c1.png");
      }
    }
  }

  &_bnb {

    > div {
      &::before {
        background-image: url("~app_images/c6.png");
      }
    }
  }

  &_doge {

    > div {
      &::before {
        background-image: url("~app_images/c7.png");
      }
    }
  }

  &_shib {

    > div {
      &::before {
        background-image: url("~app_images/c2.png");
      }
    }
  }

  &_fiat {

    > div {
      background: #f4fbeb;
    }
  }

  &__label {
    font-weight: 600;
    color: $inactive-color;
    cursor: inherit;
    display: block;
    opacity: 1;
  }

  &__value {
    font-weight: 500;
    font-size: 24px;
    line-height: inherit;
    text-transform: none;
    font-style: normal;
    color: $main-color;
    display: block;
    opacity: 1;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    max-width: 190px;
  }

  .btn {

    &.disabled {
      pointer-events: none;
      filter: grayscale(1);
      opacity: .3;
    }
  }
}

@media (min-width: 668px) {
  .balance-card {
    padding: 0 7px;
    margin-bottom: 15px;

    > div {
      padding: 15px 0 15px 85px;
      border: 1px solid #f0f2f7;
      border-radius: 8px;
      transition: border .3s;

      &::before {
        left: 15px;
      }
    }

    &:hover {

      > div {
        border: 1px solid darken(#f0f2f7, 30%);
      }
    }

    &_fiat {

      &:hover {

        > div {
          border: 1px solid darken(#f4fbeb, 30%);
        }
      }
    }
  }
}

@media (min-width: 998px) {
  .balance-card {

    &__value {
      margin: 5px 0;
    }
  }
}

@media (min-width: 1240px) {
  .balance-card {

    > div {
      padding-left: 75px;

      &::before {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
