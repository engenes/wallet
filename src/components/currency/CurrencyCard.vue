<template>
  <div
    class="currency-card"
    :class="currency_class"
  >
    <div class="currency-card__name">
      {{ name }}
    </div>
    <div class="currency-card__value">
      Баланс: <span>{{ $format({ integerSeparator: ' ', decimal: ',' })(value) }}</span>
    </div>
    <div class="currency-card__description">
      <div v-html="description" />
      <div>{{ tax }}</div>
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
    rate: {
      type: Object,
      required: true,
    },
    min_deposit: {
      type: Number,
      default: null,
    },
    min_withdraw: {
      type: Number,
      default: null,
    },
    op_type: {
      type: String,
      default: null,
    },
  },
  computed: {
    currency_class() {
      return `currency-card_${this.name.toLowerCase()}`;
    },
    description() {
      return (this.op_type === 'deposit')
        ? (`Минимальная сумма <br> пополнения: ${this.$format({ integerSeparator: ' ', decimal: ',' })(this.min_deposit)} ${this.name}`)
        : (
          this.op_type === 'withdraw'
            ? `Минимальная сумма <br> вывода: ${this.$format({ integerSeparator: ' ', decimal: ',' })(this.min_withdraw)} ${this.name}`
            : null
        );
    },
    tax() {
      return this.rate.type === 'percent'
        ? `Комиссия: ${this.rate.size}%`
        : `Комиссия: ${this.rate.size} ${this.name}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~app_scss/_vars.scss";

.currency-card {
  border: 1px solid #F2F7FF;
  border-radius: 8px;
  padding: 10px 15px;
  position: relative;
  font-weight: 600;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #eee center/cover no-repeat;
  }

  &_btc {

    &::after {
      background-image: url("~app_images/c3.png");
    }
  }

  &_usd {

    &::after {
      background-image: url("~app_images/c4.png");
    }
  }

  &_rub {

    &::after {
      background-image: url("~app_images/c5.png");
    }
  }

  &_ltc {

    &::after {
      background-image: url("~app_images/c1.png");
    }
  }

  &_bnb {

    &::after {
      background-image: url("~app_images/c6.png");
    }
  }

  &_doge {

    &::after {
      background-image: url("~app_images/c7.png");
    }
  }

  &_shib {

    &::after {
      background-image: url("~app_images/c2.png");
    }
  }

  &__description {
    margin-top: 5px;
    font-weight: 400;
    font-size: 13px;
    color: $sub-color;

    > * + * {
      margin-top: 5px;
    }

  }
}
</style>
