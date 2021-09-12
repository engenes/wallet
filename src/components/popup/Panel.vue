<template>
  <transition name="slide">
    <div
      v-if="visible"
      class="panel"
      :class="{open:is_open}"
    >
      <div
        class="panel__overlay"
        @click="hide"
      />
      <div class="panel__inner">
        <div class="panel__header">
          <slot name="header" />
          <i-close
            class="panel__close close"
            @click="hide"
          />
        </div>
        <div class="panel__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import iClose from 'app_images/ui/close.svg';

export default {
  name: 'Panel',
  components: {
    iClose,
  },
  data() {
    return {
      visible: false,
      is_open: false,
    };
  },
  methods: {
    show() {
      this.visible = true;

      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        this.is_open = true;
      }, 0);
    },
    hide() {
      this.is_open = false;

      document.body.style.overflow = null;
      setTimeout(() => {
        this.visible = false;
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.panel {

  &__inner {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 500px;
    background: #fff;
    box-shadow: -20px 0 20px -15px rgba(#000, .2);
    z-index: 1000;
    padding: 10px 15px;
    transform: translateX(100%);
    opacity: 0;
    transition: opacity .3s, transform .3s;
    overflow: auto;
  }

  &__header {
    position: relative;
    min-height: 40px;
    padding: 5px 35px 5px 0;
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
  }

  &__close {
    position: absolute;
    right: 0;
    width: 30px;
    cursor: pointer;
  }

  &__overlay {
    display: block;
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(#000, .13);
    backdrop-filter: blur(2px);
    opacity: 0;
    transition: opacity .3s;
  }

  &.open {

    .panel__inner {
      transform: translateX(0);
      opacity: 1;
    }

    .panel__overlay {
      opacity: 1;
    }
  }
}
</style>
