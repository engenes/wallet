<template>
  <ul
    v-if="errors.length"
    class="form__group-errors"
  >
    <li
      v-for="(error, key) in errors"
      :key="key"
    >
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ErrorsList',
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
