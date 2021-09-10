<template>
  <div
    class="form__group"
    :class="class_list"
  >
    <div class="form__input">
      <input
        type="tel"
        @input="onInput"
        @blur="onInput"
        @focus="setDefault"
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
import getErrors     from '@/validate/translateons';
import AppErrorsList from '@/components/inputs/ErrorsList';

export default {
  name: 'Tel',
  props: {
    value: {
      type: String,
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
      if (this.v) {
        this.v.$touch();
      }
      this.$emit('input', e.target.value);
    },
    setDefault(e) {
      if ( !e.target.value.length) {
        e.target.value = '7';
      }
    },
  },
};
</script>
<style scoped>

</style>
