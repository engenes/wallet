<template>
  <div
    class="form__group"
    :class="class_list"
  >
    <div class="form__input">
      <input
        type="date"
        :max="max_date"
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

function joinDate(t, a, s) {
  function format(m) {
    const f = new Intl.DateTimeFormat('ru', m);
    return f.format(t);
  }

  return a.map(format)
          .join(s);
}

const date_format = [{ year: 'numeric' }, { month: '2-digit' }, { day: 'numeric' }];
const today       = joinDate(new Date(), date_format, '-');

export default {
  name: 'Date',
  props: {
    max_date: {
      type: String,
      default: today,
    },
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
  },
};
</script>

<style scoped lang="scss">
.form {
  &__group {
    input {
      color: transparent;
      transition: color .3s;

      &::-webkit-calendar-picker-indicator {
        transition: opacity .3s;
        opacity: 0;
      }

      &:focus {
        color: inherit;

        &::-webkit-calendar-picker-indicator {
          opacity: 1;
        }
      }
    }

    &.active {
      input {
        color: inherit;

        &::-webkit-calendar-picker-indicator {
          opacity: 1;
        }
      }
    }
  }
}
</style>
