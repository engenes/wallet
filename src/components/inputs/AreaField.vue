<template>
  <div
    class="form__group"
    :class="class_list"
  >
    <div class="form__input">
      <label class="form__group-name">
        {{ name }}
        <i v-if="required">*</i>
      </label>
      <textarea
        :value="value"
        :style="{resize}"
        @input="onInput"
        @blur="onInput"
      />
    </div>
    <app-errors-list :errors="errors_list" />
  </div>
</template>

<script>
import AppErrorsList from '@/components/inputs/ErrorsList';
import getErrors     from '@/validate/translateons';

export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
    },
    resize: {
      type: String,
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
    touched: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppErrorsList,
  },
  mounted() {
    if (this.active && this.v) {
      this.v.$touch();
    }
  },
  computed: {
    active() {
      return (this.v && this.v.$dirty) || (this.value && this.value.length);
    },
    class_list() {
      return {
        active: this.active,
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
  methods: {
    onInput(e) {
      if (this.v) {
        this.v.$touch();
      }
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  &__input {
    background: #fff;
  }

  &__group-name {
    top: 12px;
    left: 10px;
  }

  textarea {
    background: initial;
  }
}
</style>
