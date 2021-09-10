<template>
  <div
    class="form__group form__group_checkbox"
    :class="class_list"
  >
    <div class="form__input">
      <label class="form__checkbox">
        <span class="form__group-name">
          {{ name }}
          <i v-if="required">*</i>
        </span>
        <input
          v-model="toggle"
          type="checkbox"
          :true-value="true_val"
          :false-value="false_val"
        >
        <span class="form__checkbox-check">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#7986cb"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
      </label>
    </div>
    <app-errors-list :errors="errors_list" />
  </div>
</template>

<script>
import getErrors     from '@/validate/translateons';
import AppErrorsList from '@/components/inputs/ErrorsList';

export default {
  name: 'CheckBox',
  props: {
    value: {
      type: [String, Boolean, Number],
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    v: {
      type: Object,
      default: null,
    },
    true_val: {
      type: String,
      default: null,
    },
    false_val: {
      type: String,
      default: null,
    },
  },
  components: {
    AppErrorsList,
  },
  mounted() {
    if (this.value) {
      this.toggle = this.value;
    }
    if (this.active && this.v) {
      this.v.$touch();
    }
  },
  data() {
    return {
      toggle: null,
    };
  },
  computed: {
    active() {
      return (this.v && this.v.$dirty) || (this.value && this.value.length);
    },
    class_list() {
      return {
        error: this.v && this.v.$error,
      };
    },
    errors_list() {
      if (this.v && this.active) {
        return getErrors(this.name, this.v);
      }
      return [];
    },
    required() {
      return this.v && 'required' in this.v;
    },
  },
  watch: {
    toggle(e) {
      if (this.v) {
        this.v.$touch();
      }
      this.$emit('input', e);
    },
  },
};
</script>

<style scoped lang="scss">
.form {

  &__checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  &__checkbox-check {
    margin-left: 5px;
    display: block;
    position: relative;
    width: 25px;
    height: 25px;
    border: 1px solid #7986cb;
  }

  &__group {

    &.error {

      .form__checkbox-check {
        border: 1px solid #ff0071;
      }
    }
  }
  &__group-name {
    pointer-events: initial;
    top: initial;
    left: initial;
    transform: initial;
    position: relative;
    text-align: left;
  }
}

input {
  display: none;

  + span {

    svg {
      opacity: 0;
      transition: opacity .3s;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:checked {
    + span {
      svg {
        opacity: 1;
      }
    }
  }
}
</style>
