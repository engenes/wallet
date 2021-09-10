<template>
  <div class="page">
    <main class="container">
      <slot />
    </main>
    <slot name="s-bottom" />
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style scoped>

</style>
