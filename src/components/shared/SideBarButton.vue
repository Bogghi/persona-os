<script setup lang="ts">
defineProps<{
  isActive: boolean;
  callback: () => void;
  icon: String;
}>();
</script>

<template>
  <div class="element" :class="{ active: isActive }" @click="callback">
    <i :class="icon"></i>
  </div>
</template>
