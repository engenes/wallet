<template>
  <div
    class="currency-card"
    :class="card_classes"
  >
    <div class="currency-card__label">{{ name }} баланс</div>
    <div class="currency-card__value">{{ $format({ integerSeparator: ' ' })(value) }}</div>
    <div class="currency-card__actions">
      <button class="btn btn_main">Ввод</button>
      <button
        class="btn btn_main-alt"
        :class="{disabled: prevent_withdraw}"
      >
        Вывод
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceItem',
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
        `currency-card_${this.type}`,
        `currency-name_${this.name.toLowerCase()}`,
      ];
    },
    prevent_withdraw() {
      return this.value >= this.min_withdraw;
    },
  },
};
</script>

<style scoped lang="scss">
.currency-card {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: auto;
  padding: 15px 0px;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(240, 242, 247);
  }

  &__label {
    font-weight: 600;
    color: #98a1b2;
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
    color: rgb(53, 63, 82);
    cursor: pointer;
    display: block;
    opacity: 1;
  }
}
</style>
