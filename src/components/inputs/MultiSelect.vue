<template>
  <div
    class="form__group input-dropdown input-dropdown_multi"
    :class="class_list"
  >
    <div
      ref="form_input"
      class="form__input"
      @click="is_open = !is_open"
    >
      <div class="input-dropdown__value">
        <ul
          v-if="current_val"
          class="input-dropdown__items"
        >
          <li
            v-for="(item, key) in current_val"
            :key="key"
            @click.stop="remove(key)"
          >
            {{ item }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z" />
            </svg>
          </li>
        </ul>
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
            @click.stop="add(key)"
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
import getErrors     from '@/validate/translateons';
import AppErrorsList from '@/components/inputs/ErrorsList';

export default {
  name: 'MultiSelect',
  props: {
    value: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    name: {
      type: String,
      required: true,
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
    this.component_values = this.value;
    if (this.active && this.v) {
      this.v.$touch();
    }
  },
  data() {
    return {
      component_values: [],
      is_open: false,
    };
  },
  computed: {
    active() {
      return (this.v && this.v.$dirty) || (this.value && this.value.length);
    },
    current_val() {
      const current = {};
      this.value.forEach((index) => {
        if (index in this.options) {
          this.$set(current, index, this.options[index]);
        }
      });
      return Object.keys(current).length ? current : null;
    },
    class_list() {
      return {
        active: this.active,
        open: this.is_open,
        error: this.v && this.v.$error,
      };
    },
    dropdown_options() {
      const options_list = {};
      for (const key in this.options) {
        this.$set(options_list, key, {
          name: this.options[key],
        });

        if (this.component_values.indexOf(key) !== -1) {
          this.$set(options_list[key], 'active', true);
        }
      }
      return options_list;
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
    add(key) {
      this.validate();
      if (this.component_values.indexOf(key) === -1) {
        this.component_values.push(key);
        this.$emit('input', this.component_values);
      } else {
        this.remove(key);
      }
    },
    remove(key) {
      this.validate();
      this.component_values.splice(this.component_values.indexOf(key), 1);
      this.$emit('input', this.component_values);
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
