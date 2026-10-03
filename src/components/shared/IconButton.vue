<script setup lang="ts">
  defineProps<{
    icon: String
  }>();
</script>

<template>
  <button class="py-1 px-2 rounded-lg bg-accent-muted hover:bg-accent-hover cursor-pointer border-1 border-solid border-(--color-accent)">
    <i :class="icon"></i>
  </button>
</template>
