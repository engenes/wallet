<template>
  <div
    class="form__group"
    :class="class_list"
  >
    <div class="form__input">
      <input
        type="number"
        @input="onInput"
        @blur="onInput"
      >
      <label
        v-if="name.length"
        class="form__group-name"
      >
        {{ name }}
        <i v-if="required">*</i>
      </label>
    </div>
    <app-errors-list :errors="errors_list" />
  </div>
</template>

<script>

import AppErrorsList from '@/components/inputs/ErrorsList';
import getErrors     from '@/validate/translateons';

export default {
  name: 'NumberField',
  props: {
    value: {
      type: [Number, String],
    },
    name: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      default: null,
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
      if (e.data === 'e') {
        e.target.value = this.value;
      }
      if (this.v) {
        this.v.$touch();
      }
      this.$emit('input', e.target.value);
    },
  },
  watch: {},
};
</script>

<style scoped>

</style>
