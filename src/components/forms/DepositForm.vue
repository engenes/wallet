<template>
  <div class="currency-panel">
    <app-currency-card
      :name="currency.name"
      :value="currency.value"
      :min_deposit="currency.min_deposit"
      :min_withdraw="currency.min_withdraw"
      :rate="currency.rate"
      op_type="deposit"
    />
    <transition name="fade">
      <app-preloader v-if="form_process" />
      <form
        class="currency-form form"
        v-else
        @submit.prevent="deposit"
      >
        <div class="currency-form__value">
          <app-number-field
            v-model="form.value"
            name="Сумма"
            :v="$v.form.value"
          />
          <div class="currency-form__amount">
            К пополнению {{ to_deposit }} {{ currency.name }}
          </div>
        </div>
        <app-area-field
          class="currency-form__comment"
          name="Комментарий"
          resize="none"
        />
        <button
          class="btn btn_main"
          :disabled="$v.form.$invalid"
        >
          Ввести
        </button>
      </form>
    </transition>
    <div
      v-if="final_msg"
      class="currency-panel__msg"
      :class="final_msg.type"
    >
      {{ final_msg.msg }}
    </div>
  </div>
</template>

<script>
import { mapActions }                    from 'vuex';
import { required, minValue, maxLength } from 'vuelidate/lib/validators';
import AppNumberField                    from '@/components/inputs/NumberField';
import AppAreaField                      from '@/components/inputs/AreaField';
import AppCurrencyCard                   from '@/components/currency/CurrencyCard';
import AppPreloader                      from '@/components/Preloader';
import { calcRate }                      from '@/helpers/helpers';

export default {
  name: 'DepositForm',
  props: {
    currency: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppNumberField,
    AppCurrencyCard,
    AppAreaField,
    AppPreloader,
  },
  data() {
    return {
      form: {
        value: 0,
        comment: null,
        currency_id: this.currency.id,
      },
      form_process: false,
      final_msg: null,
    };
  },
  validations() {
    return {
      form: {
        value: {
          required,
          minValue: minValue(this.currency.min_deposit),
          maxLength: maxLength(12),
        },
      },
    };
  },
  computed: {
    to_deposit() {
      const result = calcRate(this.currency.rate, this.form.value);
      return result < 0 ? 0 : this.$format({ integerSeparator: ' ', decimal: ',' })(result);
    },
  },
  methods: {
    ...mapActions('balance', ['depositBalance']),
    async deposit() {
      this.$v.form.$touch();
      this.form_process = true;
      if ( ! this.$v.form.$error && this.$v.form.$dirty) {
        const result = await this.depositBalance(this.form);
        if ( ! result) {
          this.addFinalMsg({ msg: 'При пополнении баланса произошла ошибка', type: 'error' });
        } else {
          this.form.value   = 0;
          this.form.comment = null;
          this.addFinalMsg({ msg: 'Баланс успешно пополнен', type: 'success' });
          this.$v.form.$reset();
        }
        this.form_process = false;
      }
    },

    // Добавляем ошибку, если пополнить баланс не удалось
    addFinalMsg(msg) {
      this.final_msg = msg;
      setTimeout(() => {
        this.final_msg = null;
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~app_scss/_vars.scss";

.preloader {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 50px 0;
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

.currency-panel {
  padding-top: 15px;

  &__msg {
    font-size: 13px;

    &.error {
      color: $error;
    }

    &.success {
      color: $success;
    }
  }
}

.currency-form {
  padding: 25px 0;

  .btn {
    margin: 15px auto 0;
    display: table;
  }

  &__value {
    text-align: center;
    margin-bottom: 10px;

    &::v-deep {

      .form__group {
        min-height: 112px;
        margin-bottom: 2px;
      }

      .form__input {
        display: flex;
        flex-direction: column;

        input {
          width: 100%;
          border: none;
          text-align: center;
          font-size: 36px;
          padding: 15px 0;
          outline: none;
          order: 2;
        }
      }

      .form__group-name {
        order: 1;
        position: relative;
        left: initial;
        top: initial !important;
        font-size: 16px !important;
        color: $main-color !important;
        transform: initial !important;
      }
    }
  }

  &__comment {
    font-size: 14px;
  }

  &__value-label {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
