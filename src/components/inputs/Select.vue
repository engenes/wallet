<template>
  <div
    class="form__group input-dropdown"
    :class="class_list"
  >
    <div
      ref="form_input"
      class="form__input"
      @click="is_open = !is_open"
    >
      <div class="input-dropdown__value">
        <div
          v-if="current_val"
          class="input-dropdown__current"
        >
          {{ current_val }}
        </div>
        <label>
          {{ name }}
          <i v-if="required">*</i>
        </label>
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
          />
        </svg>
      </div>
      <transition name="dropdown">
        <ul
          v-show="is_open"
          class="input-dropdown__options"
        >
          <li
            v-for="(option, key) in dropdown_options"
            :key="key"
            :class="{active: option.active}"
            @click="onSelect(key)"
          >
            {{ option.name }}
          </li>
        </ul>
      </transition>
    </div>
    <app-errors-list :errors="errors_list" />
  </div>
</template>

<script>
import AppErrorsList from '@/components/inputs/ErrorsList';
import getErrors     from '@/validate/translateons';

export default {
  name: 'Select',
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
    if (this.active && this.v) {
      this.v.$touch();
    }
  },
  data() {
    return {
      is_open: false,
    };
  },
  computed: {
    active() {
      return (this.v && this.v.$dirty) || (this.value && this.value.length);
    },
    current_val() {
      if (this.value && this.value in this.options) {
        return this.options[this.value];
      }
      return null;
    },
    dropdown_options() {
      const options_list = {};
      for (const key in this.options) {
        this.$set(options_list, key, {
          name: this.options[key],
        });

        if (key === this.value) {
          this.$set(options_list[key], 'active', true);
        }
      }
      return options_list;
    },
    class_list() {
      return {
        active: this.active,
        open: this.is_open,
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
    onSelect(key) {
      this.validate();
      this.$emit('input', key);
    },
    documentClick(e) {
      const inner_select = e.target.closest('.form__input');
      const wrapper      = this.$refs.form_input;
      if (inner_select !== wrapper) {
        this.is_open = false;
        this.validate();
      }
    },
    validate() {
      if (this.v) {
        this.v.$touch();
      }
    },
  },
  watch: {
    is_open(state) {
      if (state) {
        document.addEventListener('click', this.documentClick);
      } else {
        this.validate();
        document.removeEventListener('click', this.documentClick);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity .2s, transform .3s;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
