<template>
  <div
    class="form__group form__group_radio"
    :class="class_list"
  >
    <div class="form__input">
      <label
        v-if="name.length"
        class="form__group-name"
      >
        {{ name }}
        <i v-if="required">*</i>
      </label>
      <div class="form__group-content">
        <label
          v-for="(option, key) in options"
          :key="key"
        >
          <input
            v-model="checked_option"
            type="radio"
            :value="key"
          >
          <span>{{ option }}</span>
        </label>
      </div>
    </div>
    <app-errors-list :errors="errors_list" />
  </div>
</template>

<script>
import getErrors     from '@/validate/translateons';
import AppErrorsList from '@/components/inputs/ErrorsList';

export default {
  name: 'Radio',
  props: {
    value: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppErrorsList,
  },
  mounted() {
    if (this.value) {
      this.checked_option = this.value;
    }
  },
  data() {
    return {
      checked_option: null,
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
    checked_option(e) {
      this.$emit('input', e);
    },
  },
};
</script>

<style scoped lang="scss">
.form {

  &__group-name {
    position: relative;
    pointer-events: initial;
    top: initial;
    transform: initial;
    left: initial;
    margin-bottom: 7px;
  }

  &__group-content {
    display: flex;
    position: relative;

    input {
      display: none;

      &:checked {

        + span {
          background: #d1d8ff;
          cursor: default;
        }
      }
    }

    label {

      span {
        border: 1px solid #7986cb;
        padding: 7px;
        border-radius: 5px;
        width: 100%;
        display: block;
        transition: background-color .2s;
        cursor: pointer;
      }
    }
  }
}
</style>
