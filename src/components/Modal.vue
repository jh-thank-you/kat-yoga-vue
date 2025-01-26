<script setup>
const props = defineProps({
  show: Boolean,
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-header">
        <slot name="header">default header</slot>
        <div class="modal-nav-menu-btn" @click="$emit('close')">
          <div class="menu-btn-burger"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
/* custom styles - page specific CSS */
</style>
