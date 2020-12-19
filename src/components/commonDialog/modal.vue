<template>
  <transition name="visible">
    <div v-if="visible" :style="modalStyle" class="_modal"></div>
  </transition>
</template>

<script type='text/ecmascript-6'>
export default {
  computed: {
    visible() {
      return this.$store.state._modalShow
    },
    modalStyle() {
      return this.$store.state._modalStyle
    }
  }
}
</script>

<style scoped lang='scss'>
._modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
._modal.visible-enter-active,
._modal.visible-leave-active {
  transition: opacity 0.15s linear;
}
._modal.visible-enter,
._modal.visible-leave-to {
  opacity: 0 !important;
}
</style>
