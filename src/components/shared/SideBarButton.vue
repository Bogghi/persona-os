<script setup lang="ts">
defineProps<{
  isActive: boolean;
  callback: () => void;
  icon: String;
}>();
</script>

<template>
  <div
    class="flex items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-accent-hover"
    :class="{ 'bg-accent-muted': isActive }"
    @click="callback"
  >
    <i :class="icon"></i>
  </div>
</template>
